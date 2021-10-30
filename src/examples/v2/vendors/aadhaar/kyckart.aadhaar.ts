import { Logger } from '@zebpay/colt';
import LoggerService from '../../../logger.service';
import StorageService from '../../../../utils/storage.service';
import { PassThrough } from 'stream';
import FormData from 'form-data';
import FileUtil from '../../../../utils/file.util';
import KycVendorEndpoints from '../../../../constants/kycvendor_api.constants';
import axios, { AxiosRequestConfig } from 'axios';
import ConfigConstants from '../../../../constants/config.constants';
import { KycStatusV2 } from '../../../../enums/kyc_v2_status.enum';
import { AadhaarOcrResponse } from '../../../../interfaces/kycvendor/kyckart/response.interface';
import {
  VendorVerificationResult,
  NormalizedKycResult,
  AadhaarVendor,
} from '../../../../interfaces/kycvendor.interface';
import { KycFields } from '../../../../interfaces/kycvendor/decentro/kyc_fields.interface';
import _, { get, isEmpty } from 'lodash';
import ValueConstants from '../../../../constants/values.constants';
import { maskDocumentId } from '../../../../utils/masking.util';
import VendorResponseService from '../../vendor_response.service';
import { formatDoB } from '../../../../utils/dob.util';

const { ADDRESS_PROOF_ERRORS } = ValueConstants;
/**
 * @description AadhaarVendorService
 * @export
 * @class AadhaarVendorService
 */
export default class AadhaarVendorService implements AadhaarVendor {
  private logger: Logger;
  private storageService: StorageService;
  private vendorResponseService: VendorResponseService;
  /**
   * Creates an instance of KycKart.
   * @memberof KycKart
   */
  constructor() {
    this.logger = LoggerService.getLogger('adhwork');
    this.storageService = new StorageService();
    this.vendorResponseService = new VendorResponseService();
  }

  public async verifyDocByOcr(
    frontImage: string,
    backImage: string,
    docId: number
  ): Promise<VendorVerificationResult<KycFields>> {
    try {
      let verificationResult: VendorVerificationResult<KycFields>;
      let error;
      this.logger.info(`Verifying aadhaar `, {
        file1: frontImage,
        file2: backImage,
      });

      const frontDuplex = new PassThrough();
      const backDuplex = new PassThrough();

      await this.storageService.downloadImage(frontImage, frontDuplex);

      await this.storageService.downloadImage(backImage, backDuplex);

      const form = new FormData();

      form.append('front', frontDuplex, {
        filename: frontImage,
        contentType: FileUtil.getContentType(frontImage),
      });

      form.append('back', backDuplex, {
        filename: backImage,
        contentType: FileUtil.getContentType(backImage),
      });

      const apiBaseUrl = ConfigConstants.KYC_KART_BASE_URL;
      const apiPath = KycVendorEndpoints.AADHAAR.KYCKART.aadhaarOcr;

      const options: AxiosRequestConfig = {
        url: `${apiBaseUrl}${apiPath}`,
        method: 'POST',
        headers: {
          'x-api-key': ConfigConstants.KYC_KART_API_KEY,
          ...form.getHeaders(),
        },
        data: form,
      };
      try {
        const result = await this.sendRequest<AadhaarOcrResponse>(options);

        // Save vendor response in the VendorResponse table
        this.vendorResponseService.captureVendorResponse(
          docId,
          result.response,
          null
        );

        const status = this.getKycStatusBasedOnResponse(result);
        verificationResult = {
          kycStatus: status,
          status: status === KycStatusV2.VERIFIED ? 'SUCCESS' : 'FAILURE',
          data: {
            ...this.getKycFields(result),
          },
          failureReason:
            status === KycStatusV2.FAILED
              ? ADDRESS_PROOF_ERRORS.OCR_FAILED
              : '',
        };

        return verificationResult;
      } catch (exception) {
        error = exception;
        this.logger.error('Aadhaar verification failed ', error);
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  // TODO: Create a utility for all vendor
  private async sendRequest<T>(options: AxiosRequestConfig) {
    try {
      const response = await axios.request(options);
      return response.data as T;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get Kyc Normalizaed result
   * @private
   * @param {AadhaarOcrResponse} result
   * @return {*}  {NormalizedKycResult<KycFields>}
   * @memberof AadhaarVendorService
   */
  private getKycFields(
    result: AadhaarOcrResponse
  ): NormalizedKycResult<KycFields> {
    let res = result.response;
    if (!res.uid) return { fields: null };
    return {
      fields: {
        name: res?.name || '',
        dob: formatDoB(res?.dob),
        docId: maskDocumentId(res?.uid || res?.vid),
        address: res?.address,
        pincode: res?.pincode || '',
        state: get(res, 'splitAddress.state[0][0]', ''),
        country: get(res, 'splitAddress.country[0]', ''),
        status: 'ACTIVE',
      },
    };
  }

  /**
   * @description Get Kyc status based on response
   * @private
   * @param {AadhaarOcrResponse} result
   * @return {*}  {KycStatusV2}
   * @memberof PassPortVendorService
   */
  private getKycStatusBasedOnResponse(result: AadhaarOcrResponse): KycStatusV2 {
    if (
      result.error ||
      (isEmpty(result.response?.uid) &&
        isEmpty(result.response?.name) &&
        isEmpty(result.response?.address) &&
        isEmpty(result.response?.pincode))
    ) {
      return KycStatusV2.FAILED;
    }
    return KycStatusV2.VERIFIED;
  }
}
