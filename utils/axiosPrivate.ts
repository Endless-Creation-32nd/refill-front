import axios from 'axios';
import {
  AuthenticationError,
  EmptyAccessTokenError,
  NotFoundError,
  RefreshTokenError,
  UserNotLoggedInError,
} from './error';
import { errorTypes } from './errorTypes';
import { refreshTokenFn } from './refreshTokenFn';

axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';

      throw new EmptyAccessTokenError();
    }
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 401) {
      if (
        error?.response?.data?.errorType === errorTypes.E010 ||
        error?.response?.data?.errorType === errorTypes.E011
      ) {
        try {
          const accessToken = await refreshTokenFn();
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          return await axios.request(error.config);
        } catch (error_1) {
          if (
            error_1 instanceof RefreshTokenError ||
            error_1 instanceof EmptyAccessTokenError ||
            error_1 instanceof NotFoundError
          ) {
            window.location.href = '/login';
          }
        }
      } else if (error?.response?.data?.errorType === errorTypes.E012) {
        throw new UserNotLoggedInError(error);
      }
    } else if (error?.response?.status === 404) {
      if (error?.response.data?.errorType === errorTypes.E014) {
        throw new NotFoundError(error);
      }
    } else if (error?.response?.status === 403) {
      if (error?.response.data?.errorType === errorTypes.E013) {
        throw new AuthenticationError(error);
      }
    } else if (error?.response?.status === 409) {
      if (error?.response.data?.errorType === errorTypes.E023) {
        throw new RefreshTokenError(error);
      }
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
