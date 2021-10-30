export interface VoterIdOcrResult {
  dob: string;
  gender: string;
  name: string;
  relationName: string;
  voterId: string;
  address: string;
  date: string;
  pin: string;
}

export interface VoterIdKycResult {
  epicNo: string;
  name: string;
  nameInVernacular: string;
  gender: string;
  emailId: string;
  mobileNumber: string;
  age: string;
  dateOfBirth: string;
  relativeName: string;
  relativeRelationType: string;
  houseNumber: string;
  partOrLocationInConstituency: string;
  partNumberOrLocationNumberInConstituency: string;
  district: string;
  state: string;
  stateCode: string;
  parliamentaryConstituency: string;
  assemblyConstituency: string;
  pollingBoothCoordinates: string;
  pollingBoothAddress: string;
  pollingBoothNumber: string;
  sectionOfConstituencyPart: string;
  cardSerialNumberInPollingList: string;
  id: string;
  status: string;
}
