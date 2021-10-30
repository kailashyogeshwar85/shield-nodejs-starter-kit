export enum KycStatusV2 {
  NEW = 'NEW',
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS', // when worker will pick for processing
  VERIFIED = 'VERIFIED',
  MANUAL = 'MANUAL',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED', //Only used for BankStatus for now
  DISABLED = 'DISABLED', //Only used for BankStatus for now
}

export enum KycDocVerficationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS', // when worker will pick for processing
  VERIFIED = 'VERIFIED',
  MANUAL = 'MANUAL',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}
