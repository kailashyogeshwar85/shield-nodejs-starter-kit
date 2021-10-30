import ConfigConstants from '../../constants/config.constants';
import { KycVendors } from '../../enums/kyc_vendors.enum';
import {
  KycVendorInterface,
  PassportVendor,
  SelfieVendor,
} from '../../interfaces/kycvendor.interface';
import DecentroKycVendor from './vendors/kyc/decentro.vendor';
import KycKart from './vendors/selfie/kyckart.selfie';
import PassportService from './vendors/passport/kyckart.passport';
import AadhaarVendorService from './vendors/aadhaar/kyckart.aadhaar';
import VoterIdVendorService from './vendors/voterId/kyckart.voterId';

const { KYC_VENDORS } = ConfigConstants;
export default class KycVendorService {
  /**
   * @description Gets Kyc Vendor Service
   * @static
   * @param {KycVendors} vendorName
   * @memberof KycVendorService
   */
  static getVendorInstance() {
    let vendor: KycVendorInterface;

    switch (KYC_VENDORS.PRIMARY_KYC_VENDOR) {
      case KycVendors.DECENTRO:
        vendor = new DecentroKycVendor();
        break;
      default:
        throw new Error(`Invalid vendor ${KYC_VENDORS.PRIMARY_KYC_VENDOR}`);
    }

    return vendor;
  }

  /**
   * @description Get Passport vendor
   * @static
   * @return {*}  {PassportVendor}
   * @memberof KycVendorService
   */
  static getPassportVendor(): PassportVendor {
    let vendor: PassportVendor;
    switch (KYC_VENDORS.PASSPORT_VENDOR) {
      case KycVendors.KYCKART:
        vendor = new PassportService();
        break;
      default:
        throw new Error('Invalid passport vendor');
    }

    return vendor;
  }

  /**
   * @description Get Selfie Vendor
   * @static
   * @return {*}  {SelfieVendor}
   * @memberof KycVendorService
   */
  static getSelfieVendor(): SelfieVendor {
    let vendor: SelfieVendor;

    switch (KYC_VENDORS.SELFIE_VENDOR) {
      case KycVendors.KYCKART:
        vendor = new KycKart();
        break;
      default:
        throw new Error('Invalid selfie vendor');
    }
    return vendor;
  }

  /**
   * @description Get Aadhaar Vendor
   * @static
   * @return {*}  {any}
   * @memberof KycVendorService
   */
  static getAadhaarVendor() {
    let vendor;
    switch (KYC_VENDORS.AADHAAR_VENDOR) {
      case KycVendors.KYCKART:
        vendor = new AadhaarVendorService();
        break;
      case KycVendors.DECENTRO:
        vendor = new DecentroKycVendor();
        break;
      default:
        throw new Error('Invalid aadhaar vendor');
    }
    return vendor;
  }

  /**
   * @description Get Voter Id Vendor
   * @static
   * @return {*}  {any}
   * @memberof KycVendorService
   */
  static getVoterIdVendor() {
    let vendor;
    switch (KYC_VENDORS.VOTERID_VENDOR) {
      case KycVendors.KYCKART:
        vendor = new VoterIdVendorService();
        break;
      case KycVendors.DECENTRO:
        vendor = new DecentroKycVendor();
        break;
      default:
        throw new Error('Invalid voter id vendor');
    }
    return vendor;
  }
}
