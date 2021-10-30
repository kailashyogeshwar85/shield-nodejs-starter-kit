// export enum DocTypeId {
//   IDENTITY = 0, //pan
//   ADDRESS = 1, // Aadhar driverlicense, voterid
//   SUPPORTING = 2,
//   AADHAR = 3,
//   DRIVING_LICENSE = 4,
//   VOTER_ID = 5
// }

export enum DocType {
  ID = 'ID',
  ADDRESS = 'ADDRESS',
  BANK_SUPPORTING = 'BANK_SUPPORTING',
  FACIAL = 'FACIAL',
}

export enum DocName {
  PAN_CARD = 'PAN CARD',
  BANK_SUPPORTING = 'BANK SUPPORTING',
  AADHAAR_CARD = 'AADHAAR CARD',
  DRIVING_LICENSE = 'DRIVING LICENSE',
  VOTER_ID = 'VOTER ID',
  SELFIE = 'SELFIE',
  PASSPORT = 'PASSPORT',
}

//Make all columns Nullable
//Make separate entries for Back and Front Doc
export enum DocShortName {
  IDF = 'IDF', //'PAN FRONT'
  IDB = 'IDB', //'PAN BACK'
  DLF = 'DLF', //'Driving Licence Front'
  DLB = 'DLB', //'Driving Licence Back'
  VIF = 'VIF', // 'Voter ID Front'
  VIB = 'VIB', // 'Voter ID Back'
  ADB = 'ADB', // 'Aadhar Back'
  ADF = 'ADF', //'Aadhar Front'
  SF = 'SF', // ''Selfie'
  BS = 'BS', // 'BK_Supporting'
  PP = 'PP' // PASSPORT
}
