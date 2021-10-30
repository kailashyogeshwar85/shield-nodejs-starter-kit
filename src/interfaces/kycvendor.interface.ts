/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Readable } from 'stream';
import { DocName } from '../enums/doc_type.enum';
import { KycStatusV2 } from '../enums/kyc_v2_status.enum';
import { KycFields } from './kycvendor/decentro/kyc_fields.interface';
import { SelfieResult } from './selfie_result.interface';

export interface NormalizedKycResult<T> {
  fields: T;
}

export interface VendorVerificationResult<T> {
  status: VerificationStatus;
  failureReason?: string;
  data?: NormalizedKycResult<T>;
  kycStatus: KycStatusV2;
}

export interface KycVendorInterface {
  verifyDocById: <K>(
    docId: string,
    docName: DocName,
  ) => Promise<VendorVerificationResult<K>>;
  verifyDocByOcr: <O, K>(
    fileUrl: string,
    docName: DocName,
    docId: number,
  ) => Promise<VendorVerificationResult<KycFields>>;
}

export interface SelfieVendor {
  matchSelfieWithDocument: (
    selfieImage: string,
    docImage: string,
    docId: number,
  ) => Promise<SelfieResult>;
}

export interface PassportVendor {
  verifyDocByOcr: (
    frontImage: string,
    backImage: string,
    docId: number,
  ) => Promise<KycFields>;
}

export interface AadhaarVendor {
  verifyDocByOcr: (
    frontImage: string,
    backImage: string,
    docId: number,
  ) => Promise<KycFields>;
}

export interface VoterIdVendor {
  verifyDocByOcr: (
    frontImage: string,
    backImage: string,
    docId: number,
  ) => Promise<KycFields>;
}
interface VendorEndpoints {
  docValidate: string;
  ocrVerify: string;
}

export interface KycVendorEndpoints {
  DECENTRO: VendorEndpoints;
  SELFIE: {
    KYCKART: {
      selfieMatch: string;
    };
  };
  PASSPORT: {
    KYCKART: {
      passportOcr: string;
    };
  };
  AADHAAR: {
    KYCKART: {
      aadhaarOcr: string;
    };
  };
  VOTERID: {
    KYCKART: {
      voterIdOcr: string;
    };
  };
}

export interface VendorPayload {
  reference_id: string;
  document_type: string;
  consent: string;
  consent_purpose: string;
  kyc_validate: number;
  document_url?: string;
  document?: Readable;
}
