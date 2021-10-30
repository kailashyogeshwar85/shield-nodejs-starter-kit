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
import { PassportOcrResponse } from '../../../../interfaces/kycvendor/kyckart/response.interface';
import {
  PassportVendor,
  VendorVerificationResult,
  NormalizedKycResult,
} from '../../../../interfaces/kycvendor.interface';
import { KycFields } from '../../../../interfaces/kycvendor/decentro/kyc_fields.interface';
import { isEmpty } from 'lodash';
import ValueConstants from '../../../../constants/values.constants';
import { maskDocumentId } from '../../../../utils/masking.util';
import VendorResponseService from '../../vendor_response.service';
import { formatDoB } from '../../../../utils/dob.util';

const { ADDRESS_PROOF_ERRORS } = ValueConstants;
/**
 * @description PassPortVendorService
 * @export
 * @class PassPortVendorService
 */
export default class PassPortVendorService implements PassportVendor {
  private logger: Logger;
  private storageService: StorageService;
  private vendorResponseService: VendorResponseService;
  private readonly selfieScoreThreshold =
    ConfigConstants.SELFIE_SCORE_THRESHOLD;
  /**
   * Creates an instance of KycKart.
   * @memberof KycKart
   */
  constructor() {
    this.logger = LoggerService.getLogger('ppwork');
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
      this.logger.info(`Verifying passport `, {
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
      const apiPath = KycVendorEndpoints.PASSPORT.KYCKART.passportOcr;

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
        const result = await this.sendRequest<PassportOcrResponse>(options);

        // Save vendor response in the VendorResponse table
        this.vendorResponseService.captureVendorResponse(
          docId,
          result.response,
          ''
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
        this.logger.error('passport verification failed ', error);
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
   * @param {PassportOcrResponse} result
   * @return {*}  {NormalizedKycResult<KycFields>}
   * @memberof PassPortVendorService
   */
  private getKycFields(
    result: PassportOcrResponse
  ): NormalizedKycResult<KycFields> {
    return {
      fields: {
        name: result.response.name || '',
        dob: formatDoB(
          result.response.dob || result.response.birthDate || ''
        ),
        docId: maskDocumentId(result.response.passportNumber) || '',
        address:
          result.response.address || `${result.response.placeOfBirth}` || '',
        pincode: result.response.pincode || '',
        status: 'ACTIVE',
      },
    };
  }

  /**
   * @description Get Kyc status based on response
   * @private
   * @param {PassportOcrResponse} result
   * @return {*}  {KycStatusV2}
   * @memberof PassPortVendorService
   */
  private getKycStatusBasedOnResponse(
    result: PassportOcrResponse
  ): KycStatusV2 {
    if (
      result.error ||
      (isEmpty(result.response.passportNumber) && isEmpty(result.response.name))
    ) {
      return KycStatusV2.FAILED;
    }

    return KycStatusV2.VERIFIED;
  }
}
