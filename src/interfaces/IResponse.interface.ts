import { IResponseError } from './IResponseError.interface';

export interface IResponse {
  status: string;
  data: unknown;
  error: IResponseError;
}

export interface IServiceResult {
  [Key: string]: unknown;
}
