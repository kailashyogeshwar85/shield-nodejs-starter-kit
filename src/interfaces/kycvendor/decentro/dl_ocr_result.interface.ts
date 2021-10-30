export interface DLOcrResult {
  cardId: string;
  dob: string;
  name: string;
}

interface KycAddresses {
  addressLine: string;
  completeAddress: string;
  country: string;
  district: string;
  pin: string;
  state: string;
  type: string;
}

export interface DLKycResult {
  addresses: KycAddresses[];
  drivingLicenseNumber: string;
  dateOfBirth: string;
  name: string;
  state: string;
  status: string;
}
