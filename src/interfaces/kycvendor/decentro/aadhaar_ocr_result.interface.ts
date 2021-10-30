export interface AadhaarOcrResult {
  cardNo: string;
  dateInfo: string;
  dateType: string;
  name: string;
  fatherName: string;
  gender: string;
  vid: string;
  sonOf: string;
  husbandOf: string;
  address: string;
}

export interface AadhaarKycResult {
  name?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  careOf?: string;
  photo?: string;
}
