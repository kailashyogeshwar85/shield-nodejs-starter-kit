/**
 * @description Api Error Object consumed by ApiError Class
 * @export
 * @interface IApiError
 */
export default interface IApiError {
  message: string;
  statusCode: number;
  errorCode: string;
  errors: [];
}
