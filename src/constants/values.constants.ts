import dotenv from 'dotenv';

dotenv.config();

export default class ValuesConstants {
  static readonly MISSING_REQUEST_PARAM = 'Missing required parameters.';

  static readonly INVALID_DATA_TYPE = 'Invalid data type.';

  static readonly SERVICE_NAME = process.env.SERVICE_NAME || 'enigma';
}
