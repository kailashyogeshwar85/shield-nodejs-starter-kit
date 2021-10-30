export enum KycVendors {
  'DECENTRO' = 'decentro',
  'KYCKART' = 'kyckart',
}

// system docName will be used for mapping
export enum DecentroDocTypes {
  PAN_CARD = 'PAN',
  AADHAR_CARD = 'AADHAAR',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  VOTER_ID = 'VOTERID',
  PASSPORT = 'PASSPORT',
}

export enum VendorResponseStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
