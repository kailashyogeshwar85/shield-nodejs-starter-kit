export interface IValidationError {
  code: string;
  field: string;
  message: string;
}

export interface IResponseError {
  error: {
    code: string;
    message: string;
    errors: IValidationError[];
  };
}
