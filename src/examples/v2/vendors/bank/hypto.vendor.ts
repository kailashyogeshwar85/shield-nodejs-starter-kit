import { Logger } from '@zebpay/colt';

import NetworkConstants from '../../../../constants/network.constants';
import axios, { Method, AxiosRequestConfig, AxiosError } from 'axios';
import EventStore from '../../eventstore.service';
import StorageService from '../../../../utils/storage.service';

import { BankVendorInterface } from '../../../../interfaces/bank_vendor.interface';
import Constants from '../../../../constants/constants';
import BankVendorEndpoints from '../../../../constants/bank_vendor_api.constants';
import { PennyDropResponseInterface } from '../../../../interfaces/bank_vendor/penny_drop_response.interface';
import {
  HyptoPennyResponseInterface,
  PennyDropFields,
} from '../../../../interfaces/bank_vendor/hypto_penny_drop_response.interface';
import PennyDropRequestResponse from '../../../../database/models/penny_drop_request_response.model';
import { PennyDropRequestResponseInterface } from '../../../../interfaces/model_interfaces/penny_drop_request_response.interface';
import { PennyDropStatusEnum } from '../../../../enums/penny_drop_status.enum';
import Network from '../../../../constants/network.constants';
import ConfigConstants from '../../../../constants/config.constants';

interface requestOptions {
  apiPath: string;
  method: Method;
  headers: any;
  data: any;
}
/**
 * @description
 * @class Hypto
 * @implements {BankVendorInterface}
 */
class Hypto implements BankVendorInterface {
  private HYPTO_CONSTANTS = Constants.HYPTO.PROPERTIES;
  private apiConfig: { baseUrl: string; headers: {} };
  private eventStore: EventStore;
  private storageService: StorageService;
  private logger: Logger;

  /**
   * Creates an instance of Hypto.
   * @memberof Hypto
   */
  constructor() {
    this.logger = new Logger('hypto');
    this.apiConfig = {
      baseUrl: this.HYPTO_CONSTANTS.BASE_API_URL,
      headers: {
        'Authorization': this.HYPTO_CONSTANTS.API_KEY,
        'content-type': 'application/json',
      },
    };

    this.eventStore = new EventStore();
    this.storageService = new StorageService();
  }

  /**
   *
   * @param accountNumber
   * @param routingCode
   * @returns {*}  {Promise<PennyDropResult<HyptoPennyResponseInterface>>}
   */
  async performPennyDrop(
    accountNumber: string,
    routingCode: string,
    bankId: number,
    userId: string
  ): Promise<any> {
    let hyptoObj = {
      number: accountNumber,
      ifsc: routingCode,
    };
    //Save Request Object for Penny Drop
    const pennyDropRequestDBRecord = await this.savePennyDropRequest(
      hyptoObj,
      bankId,
      userId
    );

    let apiResponse: HyptoPennyResponseInterface;

    try {
      const options: AxiosRequestConfig = {
        url: `${this.apiConfig.baseUrl}${BankVendorEndpoints.HYPTO.pennyDrop}`,
        method: 'POST',
        data: hyptoObj,
        headers: this.apiConfig.headers,
      };
      apiResponse = await this.sendRequest<HyptoPennyResponseInterface>(
        options
      );
    } catch (e) {
      apiResponse = e.response ? e.response.data : {};
      this.logger.error(
        `Error initiating bank verification request in hypto for ${accountNumber}`,
        e,
        {}
      );
      // Check if it's HTTP 400 or 429  error
      if (
        e.response && (
          e.response.status === 400 ||
          e.response.status === 429
        )
      ) {
        this.logger.debug(
          `Received ${e.response.status} from Hypto API`,
          e.response.toJSON(),
          { accountNumber, userId }
        );

        const mockedFailedResponse: PennyDropResponseInterface = {
          accountNumber,
          routingCode,
          beneficiaryName: '',
          status: PennyDropStatusEnum.FAILED,
          reason: apiResponse.message,
        };
        return mockedFailedResponse;
      }

      throw {
        message: 'Hypto verification request failed',
        error: 500,
      };
    }
    const pennyDropResult = apiResponse.data;

    await this.updatePennyDropResponse(
      pennyDropResult,
      pennyDropRequestDBRecord.getDataValue('id')
    );
    const genericPennyDropResult =
      this.transformPennyDropResult(pennyDropResult);

    return genericPennyDropResult;
  }

  async savePennyDropRequest(
    hyptoObj: { number: string; ifsc: string },
    bankId,
    userId
  ) {
    const saveObject: PennyDropRequestResponseInterface = {
      userId,
      bankId,
      status: PennyDropStatusEnum.PENDING,
      requestObject: hyptoObj,
      createdBy: ConfigConstants.SERVICE_NAME,
      updatedBy: ConfigConstants.SERVICE_NAME,
    };
    return await new PennyDropRequestResponse(saveObject).save();
  }

  async updatePennyDropResponse(responseObject: PennyDropFields, id: number) {
    const updateObject: PennyDropRequestResponseInterface = {
      status: responseObject.status,
      transactionId: responseObject.reference_number,
      responseObject,
      updatedBy: ConfigConstants.SERVICE_NAME,
    };
    await PennyDropRequestResponse.update(updateObject, {
      where: {
        id,
      },
    });
  }

  transformPennyDropResult(
    pennyDropResult: PennyDropFields
  ): PennyDropResponseInterface {
    const genericPennyPropResult: PennyDropResponseInterface = {
      accountNumber: pennyDropResult.verify_account_number,
      routingCode: pennyDropResult.verify_account_ifsc,
      beneficiaryName: pennyDropResult.verify_account_holder,
      status: pennyDropResult.status,
      reason: pennyDropResult.verify_reason,
    };
    return genericPennyPropResult;
  }

  private async sendRequest<T>(options: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios.request(options);
      return response.data as T;
    } catch (exception) {
      throw exception;
    }
  }
  async getTransactionStatus(
    txnId: string
  ): Promise<PennyDropResponseInterface> {
    const options: AxiosRequestConfig = {
      url: `${this.apiConfig.baseUrl}${BankVendorEndpoints.HYPTO.txnStatus}${txnId}`,
      method: 'GET',
      headers: this.apiConfig.headers,
    };
    try {
      const response = await this.sendRequest<HyptoPennyResponseInterface>(
        options
      );

      const genericResponse = this.transformPennyDropResult(response.data);
      this.logger.info('Successfully checked txn status ', { txnId });
      return genericResponse;
    } catch (exception) {
      let message = this.getErrorMessage(exception);
      this.logger.error(`Status check failed. ${message}`, exception, {
        txnId,
      });
      this.logger.debug(`Failing bank with txnId ${txnId}`);
      const response: PennyDropResponseInterface = {
        accountNumber: '',
        beneficiaryName: '',
        status: PennyDropStatusEnum.FAILED,
        routingCode: '',
        reason: exception?.response?.data?.message,
      };
      return response;
    }
  }

  getErrorMessage(error: AxiosError) {
    if (!error.response) {
      return '';
    }
    let message = '';

    switch (error.response.status) {
      case 404:
        message = 'Transaction not found.';
        break;
      case 429:
        message = 'Rate limit exceeded.';
        break;
    }
    return message;
  }
}

export default Hypto;
