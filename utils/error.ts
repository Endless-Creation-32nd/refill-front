import { AxiosError } from 'axios';

export function isInstanceOfAPIError(object: unknown): object is ApiError {
  return object instanceof ApiError;
}
export interface ErrorData {
  httpStatus: number;
  errorType: string;
  message: string;
}

export class ApiError extends Error {
  redirectUrl: string = '';
  notFound: boolean = false;

  httpStatus?: number;
  errorType?: string;
  axiosError?: AxiosError;

  constructor(axiosError: AxiosError<ErrorData>) {
    super();
    this.name = 'API_ERROR';
    this.httpStatus = 500;
    this.errorType = 'ERROR_UNKNOWN';
    this.axiosError = axiosError;

    if (axiosError.response) {
      this.httpStatus = axiosError.response.status;

      if (axiosError.response.data) {
        this.message = axiosError.response.data.message;
        this.errorType = axiosError.response.data.errorType;
      } else {
        this.message = axiosError.message;
      }
    }
  }
}

export class BadRequestError extends ApiError {
  axiosError: AxiosError;

  constructor(axiosError: AxiosError<ErrorData>) {
    super(axiosError);
    this.name = 'BAD_REQEUST';
    this.axiosError = axiosError;
  }
}

export class AuthenticationError extends ApiError {
  axiosError: AxiosError;

  constructor(axiosError: AxiosError<ErrorData>) {
    super(axiosError);
    this.name = 'AUTHENTICATION_ERROR';
    this.redirectUrl = '/login';
    this.axiosError = axiosError;
  }
}
export class NotFoundError extends ApiError {
  notFound = true;
  axiosError: AxiosError;

  constructor(axiosError: AxiosError<ErrorData>) {
    super(axiosError);
    this.name = 'NOT_FOUNDED';
    this.redirectUrl = '/404';
    this.axiosError = axiosError;
  }
}

export class ForbiddenError extends ApiError {
  name = 'ForbiddenError';

  message = '인증처리에 실패했습니다.';

  redirectUrl = '/error';
}

export class UserNotLoggedInError extends ApiError {
  axiosError: AxiosError;

  constructor(axiosError: AxiosError<ErrorData>) {
    super(axiosError);
    this.name = 'USER_NOT_LOGGED_IN_ERROR';
    this.redirectUrl = '/login';
    this.axiosError = axiosError;
  }
}

export class RefreshTokenError extends ApiError {
  axiosError: AxiosError;

  constructor(axiosError: AxiosError<ErrorData>) {
    super(axiosError);
    this.name = 'REFRESH_TOKEN_ERROR';
    this.redirectUrl = '/login';
    this.axiosError = axiosError;
  }
}

export class AuthorizationError extends ApiError {
  axiosError: AxiosError;

  constructor(axiosError: AxiosError<ErrorData>) {
    super(axiosError);
    this.name = 'AUTHORIZATION_ERROR';
    this.axiosError = axiosError;
  }
}

export class EmptyAccessTokenError extends Error {
  constructor() {
    super();
  }
  message = 'No access token';
  redirectUrl = '/login';
}
