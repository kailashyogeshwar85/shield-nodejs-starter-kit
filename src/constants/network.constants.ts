export default class NetworkConstants {
  static readonly HTTP_STATUS_CODE = {
    OK: 200, // Standard response for successful HTTP requests.
    CREATED: 201, // Object is created
    BAD_REQUEST: 400, // The server cannot or will not process the request due to an apparent client error
    UNAUTHORIZED: 401, // Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.
    FORBIDDEN: 403, //  The request contained valid data and was understood by the server, but the server is refusing action.
    NOT_FOUND: 404, // The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    METHOD_NOT_ALLOWED: 405, // The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request
    REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    NO_CONTENT: 204, // The server successfully processed the request, and is not returning any content
  };

  static ERROR_CODES = {
    // error code in format
    INVALID_CREDENTIALS: {
      message: 'Invalid Username/Password',
      code: 'US01',
    },
    USER_EMAIL_NOT_VERIFIED: {
      message: 'User email is not verified',
      code: 'US02',
    },
  };
}
