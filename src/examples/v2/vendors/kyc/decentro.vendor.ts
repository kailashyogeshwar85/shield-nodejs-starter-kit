import { Logger } from '@zebpay/colt';
import { createReadStream, createWriteStream } from 'fs';
import { KycVendorInterface, NormalizedKycResult, VendorPayload, VendorVerificationResult } from '../../../../interfaces/kycvendor.interface';
import ConfigConstants from '../../../../constants/config.constants';
import NetworkConstants from '../../../../constants/network.constants';
import axios, { Method } from 'axios';
import { v4 } from 'uuid';
import StorageService from '../../../../utils/storage.service';
import { PassThrough } from 'stream';
import FormData from 'form-data';
import { v4 as uuid } from 'uuid';
import { DocName } from '../../../../enums/doc_type.enum';
import DocTypeUtil from '../../../../utils/doctype.util';
import VendorApiConstants from '../../../../constants/kycvendor_api.constants';
import FileUtil from '../../../../utils/file.util';
import { VendorAPIResponse } from '../../../../interfaces/kycvendor/vendor_api_response.interface';
import { VendorResponseStatus } from '../../../../enums/kyc_vendors.enum';
import { KycStatusV2 } from '../../../../enums/kyc_v2_status.enum';
import KycV2Service from '../../kyc.service';
import { PanKycResult, PanOcrResult } from '../../../../interfaces/kycvendor/decentro/pan_ocr_result.interface';
import Values from '../../../../constants/values.constants';
import VendorResponseService from '../../vendor_response.service';
import { DecentroApiResponseInterface as DecentroResponse } from '../../../../interfaces/kycvendor/decentro/api_response.interface';
import { DLKycResult } from '../../../../interfaces/kycvendor/decentro/dl_ocr_result.interface';
import { KycFields } from '../../../../interfaces/kycvendor/decentro/kyc_fields.interface';
const ERROR_CODES = NetworkConstants.ERROR_CODES;
import { maskDocumentId } from '../../../../utils/masking.util';
import { get } from 'lodash';

interface requestOptions {
  apiPath: string;
  method: Method,
  headers: any,
  data: any
}
/**
 * @description
 * @class Decentro
 * @implements {KycVendorInterface}
 */
class Decentro implements KycVendorInterface {
  private apiConfig: { baseUrl: string, headers: {} };
  private storageService: StorageService;
  private logger: Logger;
  private kycService: KycV2Service;
  private vendorResponseService: VendorResponseService;

  /**
   * Creates an instance of Decentro.
   * @memberof Decentro
   */
  constructor() {
    this.logger = new Logger('decentro');
    this.apiConfig = {
      baseUrl: ConfigConstants.KYC_VENDOR_BASE_URL,
      headers: {
        client_id: ConfigConstants.KYC_VENDOR_CREDENTIALS.clientId,
        client_secret: ConfigConstants.KYC_VENDOR_CREDENTIALS.clientSecret,
        module_secret: ConfigConstants.KYC_VENDOR_CREDENTIALS.moduleSecret,
        'content-type': 'application/json',
      }
    };
    this.storageService = new StorageService();
    // this.kycService = new KycV2Service();
    this.vendorResponseService = new VendorResponseService();
  }

  /**
   * @description Verifies pan by id
   * @param {string} docId
   * @return {*}  {Promise<unknown>}
   * @memberof Decentro
   */
  async verifyDocById<K>(docId: string, docName: DocName): Promise<any> {
    const referenceId = v4();
    const payload = {
      reference_id: referenceId,
      document_type: DocTypeUtil.getVendorDocTypeFromDocName(docName),
      id_number: docId,
      consent: 'Y',
      consent_purpose: "For bank account purpose only"
    };

    const options: requestOptions = {
      apiPath: VendorApiConstants.DECENTRO.docValidate,
      method: 'POST',
      headers: {},
      data: payload,
    };
    try {
      const verificationResponse = await this.sendRequest<DecentroResponse<void, K>>(
        options
      );
    } catch (exception) {
      throw exception;
    }
  }

  /**
   * @description Verifies pan by ocr
   * @param {string} fileName
   * @param {string} docName
   * @param {string} docId
   * @return {*}  {Promise<VendorVerificationResult>}
   * @memberof Decentro
   * // will receive OcrResult, KycResult
   * // eg:For docName = 'PAN' => verifyDocByOcr<PanOcrResult, PanKycResult>()
   */
  public async verifyDocByOcr<O, K>(
    fileName: string,
    docName: DocName,
    docId: number, // database id to capture response
  ): Promise<any> {
    const options: requestOptions = {
      apiPath: '',
      method: 'GET',
      headers: {},
      data: {}
    };
    try {
      const duplex = new PassThrough();

      await this.storageService.downloadImage(
        fileName,
        duplex,
      );
      const validateKyc = true;

      const payload = this.getCommonPayloadFields(
        docName,
        validateKyc
      );

      const form = new FormData();

      this.createFormDataFromJson(payload, form);

      form.append('document', duplex, {
        filename: fileName,
        contentType: FileUtil.getContentType(fileName)
      });

      options.apiPath = VendorApiConstants.DECENTRO.ocrVerify;
      options.method = 'POST';
      options.headers = {
        'Content-Type': 'multipart/form-data',
        ...form.getHeaders()
      };

      options.data = form;
    } catch (exception) {
      this.logger.error('error while downloading image ', exception, {
        fileName
      });
      throw ERROR_CODES.S3_DOWNLOAD_FAILED;
    }

    // only responsible for sending if it is
    // success or failure depending on its response
    // workers should be dumb and understand only SUCCESS, FAILURE, PENDING
    try {
      const verificationResponse =
        await this.sendRequest<DecentroResponse<O, K>>(
          options
        );
      const verificationResult = verificationResponse.response;

      // mark sensitive fields
      this.vendorResponseService.captureVendorResponse(
        docId,
        verificationResult,
        verificationResult.decentroTxnId,
      );

      const result = this.processResult(
        verificationResponse,
        this.getKycResult(verificationResponse),
        this.getOcrResult(verificationResponse),
        docName,
      );
      return result;
    } catch (error) {
      this.logger.error('exception occurred', error);
      throw ERROR_CODES.VENDOR_API_FAILED;
    }
  }

  /**
   * @description Builds and return payload
   * @private
   * @param {DocName} docName
   * @return {*}  {VendorPayload}
   * @memberof Decentro
   */
  private getCommonPayloadFields(docName: DocName, validateKyc: boolean): VendorPayload {
    const fields: VendorPayload = {
      reference_id: uuid(),
      document_type: DocTypeUtil.getVendorDocTypeFromDocName(docName),
      consent: 'Y',
      consent_purpose: 'for bank account purpose only',
      kyc_validate: validateKyc ? 1 : 0,
    };

    return fields;
  }

  /**
   * @description Created FormData from json
   * @private
   * @param {*} data
   * @param {FormData} form
   * @memberof Decentro
   */
  private createFormDataFromJson(data: any, form: FormData) {
    for (const [key, value] of Object.entries(data)) {
      form.append(key, value);
    }
  }

  /**
   * @description Sends Request to server
   * @private
   * @param {string} method
   * @param {{}} body
   * @param {boolean} [isFormData=false]
   * @memberof Decentro
   */
  private async sendRequest<T>({
    apiPath,
    method,
    headers,
    data,
  }: requestOptions): Promise<
    VendorAPIResponse<T>> {
    try {
      const response = await axios.request({
        url: `${this.apiConfig.baseUrl}${apiPath}`,
        method,
        headers: Object.assign(
          {},
          this.apiConfig.headers,
          headers,
        ),
        data,
      });

      return { response: response.data } as any;
    } catch (exception) {
      this.logger.debug('Vendor API Failed', {
        apiPath,
        data: exception.response
          ? exception.response.data
          : {}
      });
      this.logger.error('Vendor API Failed Exception',
        exception.response
          ? exception.response.data
          : exception
      );
      throw exception;
    }
  }

  // should be generic to take any doc kyc result and return fields
  public processResult(
    apiResponse: VendorAPIResponse<DecentroResponse<any, any>>,
    kycResult: KycResult,
    ocrResult: OcrResult,
    docName: DocName,
  ): VendorVerificationResult<KycFields> {
    // based on doc name return standard fields
    const response = apiResponse.response;
    const result: VendorVerificationResult<KycFields> = {
      status: 'SUCCESS',
      failureReason: '',
      data: {} as any,
      kycStatus: this.getKycStatusFromResponse(response),
    };

    switch (response.status) {
      case VendorResponseStatus.FAILURE:
        result.status = VendorResponseStatus.FAILURE;
        result.failureReason = response.error
          ? response.error.message
          : 'Bad Request Parameters';
        result.data = this.getKycFields(
          kycResult,
          ocrResult,
          docName,
        );
        break;
      case VendorResponseStatus.SUCCESS:
        result.status = VendorResponseStatus.SUCCESS;
        result.failureReason = '';
        result.data = this.getKycFields(
          kycResult,
          ocrResult,
          docName,
        );
        break;
      case VendorResponseStatus.PENDING:
        result.status = VendorResponseStatus.PENDING;
        result.failureReason = '';
        result.data = this.getKycFields(
          kycResult,
          ocrResult,
          docName,
        );
        break;
    };

    if (response.kycStatus === VendorResponseStatus.FAILURE) {
      result.failureReason = response.message || '';
    }
    return result;
  }

  /**
   * @description Returns normalized fields for all result.
   * @private
   * @param {KycResult} kycResult
   * @param {OcrResult} ocrResult
   * @return {*}  {NormalizedKycResult<KycFields>}
   * @memberof Decentro
   */
  private getKycFields(
    kycResult: KycResult,
    ocrResult: OcrResult,
    docName: DocName,
  ): NormalizedKycResult<KycFields> {
    return {
      fields: {
        name: kycResult.name || ocrResult.name,
        fatherName: ocrResult.fatherName || '',
        gender: kycResult.gender || '',
        docId: !this.isIdProof(docName) ? maskDocumentId(
          kycResult.idNumber
          || (ocrResult.cardId || kycResult.drivingLicenseNumber)
          || (kycResult.epicNo || ocrResult.voterId)
          || ocrResult.cardNo,
        ) : (kycResult.idNumber || ocrResult.cardNo),
        dob:
          ocrResult.dataInfo
          || ocrResult.dob
          || ocrResult.dateInfo
          || kycResult.dateOfBirth,
        status: kycResult.idStatus || kycResult.status || '',
        address:
          kycResult.addresses && kycResult.addresses.length
            ? kycResult.addresses[0].completeAddress
            : ocrResult.address
            || kycResult.address
            || kycResult.pollingBoothAddress
            || '',
        country: kycResult.addresses && kycResult.addresses.length
          ? kycResult.addresses[0].country
          : '',
        state: kycResult.addresses && kycResult.addresses.length
          ? kycResult.addresses[0].state
          : kycResult.state,
        pincode: kycResult.addresses && kycResult.addresses.length
          ? kycResult.addresses[0].pin
          : ocrResult.pin,
        age: get(kycResult, 'age', 0),
      }
    }
  }

  private getKycStatusFromResponse(
    response: DecentroResponse<OcrResult, KycResult>,
  ): KycStatusV2 {
    const { kycStatus, ocrStatus } = response;
    const ocrResult = response.ocrResult;
    // in case of only kyc ocrStatus will be undefined
    if (kycStatus && ocrStatus) {
      return (
        kycStatus === VendorResponseStatus.SUCCESS &&
        ocrStatus === VendorResponseStatus.SUCCESS
      )
        ? KycStatusV2.VERIFIED
        : kycStatus === VendorResponseStatus.PENDING && (
          ocrResult.cardNo || ocrResult.address
        ) ? KycStatusV2.MANUAL : KycStatusV2.FAILED;
    }
    return (
      kycStatus &&
      kycStatus === VendorResponseStatus.SUCCESS
    )
      ? KycStatusV2.VERIFIED
      : KycStatusV2.FAILED;
  }

  private getKycResult<K>(apiResponse: VendorAPIResponse<DecentroResponse<any, any>>): K {
    return apiResponse.response.kycResult || {} as any;
  }

  private getOcrResult<O>(apiResponse: VendorAPIResponse<DecentroResponse<any, any>>): O {
    return apiResponse.response.ocrResult || {} as any;
  }

  private isIdProof(docName: DocName) {
    return docName === DocName.PAN_CARD;
  }
}


export default Decentro;
