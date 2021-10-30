import { VendorResponseStatus } from '../../../enums/kyc_vendors.enum';

export interface DecentroApiResponseInterface<O, K> {
  status: VendorResponseStatus;
  message: string;
  ocrStatus: VendorResponseStatus;
  kycStatus: VendorResponseStatus;
  ocrResult: O;
  kycResult?: K;
  error?: {
    message: string;
    responseCode: string;
  };
  responseCode: string;
  requestTimestamp: string;
  responseTimestamp: string;
  decentroTxnId: string;
}
