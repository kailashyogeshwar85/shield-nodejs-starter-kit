import { Logger } from '@zebpay/colt';
import LoggerService from '../../../logger.service';
import StorageService from '../../../../utils/storage.service';
import { PassThrough } from 'stream';
import FormData from 'form-data';
import FileUtil from '../../../../utils/file.util';
import KycVendorEndpoints from '../../../../constants/kycvendor_api.constants';
import axios, { AxiosRequestConfig } from 'axios';
import ConfigConstants from '../../../../constants/config.constants';
import { SelfieResult } from '../../../../interfaces/selfie_result.interface';
import { KycStatusV2 } from '../../../../enums/kyc_v2_status.enum';
import { SelfieResponse } from '../../../../interfaces/kycvendor/kyckart/response.interface';
import { SelfieVendor } from '../../../../interfaces/kycvendor.interface';
import VendorResponseService from '../../vendor_response.service';

/**
 * @description Selfie Validator
 * @export
 * @class KycKart
 */
export default class KycKart implements SelfieVendor {
  private logger: Logger;
  private storageService: StorageService;
  private readonly selfieScoreThreshold = ConfigConstants.SELFIE_SCORE_THRESHOLD;
  private vendorResponseService: VendorResponseService;

  /**
   * Creates an instance of KycKart.
   * @memberof KycKart
   */
  constructor() {
    this.logger = LoggerService.getLogger('sfwork');
    this.storageService = new StorageService();
    this.vendorResponseService = new VendorResponseService();
  }


  /**
   * @description Matches selfie with id doc
   * @param {string} selfieImageKey
   * @param {string} idImageKey
   * @param {number} docId
   * @return {*}  {Promise<SelfieResult>}
   * @memberof KycKart
   */
  async matchSelfieWithDocument(
    selfieImageKey: string,
    idImageKey: string,
    docId: number,
  ): Promise<SelfieResult> {
    let result: SelfieResponse;
    let error;
    try {
      this.logger.info(`Matching selfie `, {
        file1: selfieImageKey,
        file2: idImageKey
      });
      const selfieDuplex = new PassThrough();
      const idImageDuplex = new PassThrough();

      await this.storageService.downloadImage(
        selfieImageKey,
        selfieDuplex
      );

      await this.storageService.downloadImage(
        idImageKey,
        idImageDuplex,
      );

      const form = new FormData();

      form.append('image1', selfieDuplex, {
        filename: selfieImageKey,
        contentType: FileUtil.getContentType(selfieImageKey),
      });

      form.append('image2', idImageDuplex, {
        filename: idImageKey,
        contentType: FileUtil.getContentType(selfieImageKey),
      });
      const apiBaseUrl = ConfigConstants.KYC_KART_BASE_URL;
      const apiPath = KycVendorEndpoints.SELFIE.KYCKART.selfieMatch;


      const options: AxiosRequestConfig = {
        url: `${apiBaseUrl}${apiPath}`,
        method: 'POST',
        headers: {
          'x-api-key': ConfigConstants.KYC_KART_API_KEY,
          ...form.getHeaders()
        },
        data: form
      };

      try {
        result = await this.sendRequest<SelfieResponse>(options);
        this.vendorResponseService.captureVendorResponse(
          docId,
          result,
          null,
        )
      } catch (exception) {
        error = exception;
        this.logger.error('selfie verification failed ',
          error
        );
      }
    } catch (exception) {
      this.logger.error('Something went wrong ', exception);
    }

    return this.createSelfieResultFromResponse(
      result,
      error,
    )
  }

  /**
   * @description Selfie Score
   * @private
   * @param {SelfieResponse} [result]
   * @param {*} [error]
   * @return {*}  {SelfieResult}
   * @memberof KycKart
   */
  private createSelfieResultFromResponse(
    result?: SelfieResponse,
    error?: any
  ): SelfieResult {
    const score = result
      ? this.parseScore(result.response.matchPercentage)
      : 0;
    const message = result
      ? result.response.message
      : 'API FAILED';

    const vendorStatus = !result || !result.response.verified
      ? KycStatusV2.FAILED
      : KycStatusV2.VERIFIED;

    const status = this.getStatusBasedOnResult(result, error);
    let tips;

    if (result && score < this.selfieScoreThreshold) {
      tips = `Selfie score is less than ${this.selfieScoreThreshold}%`
    }

    const errorMessage =
      error && error.toJSON
        ? error.toJSON()
        : error;

    return {
      score,
      result,
      status,
      message,
      vendorStatus,
      tips,
      error: errorMessage,
    };
  }

  /**
   * @description Parses Matching score
   * @private
   * @param {string} score
   * @return {*}
   * @memberof KycKart
   */
  private parseScore(score: string) {
    if (!score) {
      return 0;
    }
    const percentage = Number(score.slice(0, -1));

    return percentage || 0;
  }

  private getStatusBasedOnResult(
    result: SelfieResponse,
    error?: any
  ): KycStatusV2 {
    if (error || !result) {
      return KycStatusV2.MANUAL;
    }
    const score = this.parseScore(result.response.matchPercentage);
    if (
      result.response.verified &&
      score >= this.selfieScoreThreshold
    ) {
      return KycStatusV2.VERIFIED;
    } else {
      return KycStatusV2.MANUAL; // as per business requirements
      // return KycStatusV2.FAILED;
    }
  }

  private async sendRequest<T>(options: AxiosRequestConfig) {
    try {
      const response = await axios.request(options);
      return response.data as T;
    } catch (error) {
      throw error;
    }
  }
}
