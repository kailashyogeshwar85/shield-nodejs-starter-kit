import { KycStatusV2 } from '../enums/kyc_v2_status.enum';

export interface SelfieResult {
  status: KycStatusV2;
  score: number;
  vendorStatus: string;
  result: unknown;
  message?: string;
  error?: unknown;
  tips?: string;
}
