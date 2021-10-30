export interface SelfieResponse {
  response: {
    verified: boolean;
    message: string;
    matchPercentage: string;
    maskDetections: [];
  };
}

export interface PassportOcrResponse {
  response: {
    fileNumber: string;
    passportNumber: string;
    name: string;
    address: string;
    birthDate: string;
    sex: string;
    nationality: string;
    dob: string;
    parentsGuardianName: string;
    expiryDate: string;
    issueDate: string;
    placeOfIssue: string;
    placeOfBirth: string;
    pincode: string;
  };
  error?: {
    title: string;
    message: string;
    info: unknown;
    type: string;
    code: string;
  };
}

export interface AadhaarOcrResponse {
  response: {
    uid: string;
    vid: string;
    name: string;
    dob: string;
    yob: string;
    pincode: string;
    address: string;
    gender: string;
    splitAddress: {
      district: Array<string>;
      state: Array<Array<string>>;
      city: Array<string>;
      pincode: string;
      country: Array<string>;
      addressLine: string;
    };
    uidHash: string;
    summary: {
      number: string;
      name: string;
      dob: string;
      address: string;
      splitAddress: {
        district: Array<string>;
        state: Array<Array<string>>;
        city: Array<string>;
        pincode: string;
        country: Array<string>;
        addressLine: string;
      };
      gender: string;
      guardianName: string;
      issueDate: string;
      expiryDate: string;
    };
  };
  error?: {
    title: string;
    message: string;
    info: unknown;
    type: string;
    code: string;
  };
}

export interface VoterIdOcrResponse {
  response: {
    name: string;
    fatherName: string;
    address: string;
    state: string;
    ageAsOn: string;
    dob: string;
    gender: string;
    yob: string;
    epicNumber: string;
    splitAddress: {
      district: [];
      state: Array<Array<string>>;
      city: [];
      pincode: string;
      country: Array<string>;
      addressLine: string;
    };
  };
  error?: {
    title: string;
    message: string;
    info: unknown;
    type: string;
    code: string;
  };
}
