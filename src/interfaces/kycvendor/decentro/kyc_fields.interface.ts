export interface KycFields {
  name: string;
  dob: string;
  docId: string;
  status: string;
  fatherName?: string;
  address?: string;
  country?: string;
  state?: string;
  pincode?: string;
  gender?: string;
  age?: string | number;
}
