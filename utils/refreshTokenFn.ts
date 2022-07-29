import { AxiosError } from 'axios';
import { axiosPublic } from './axiosPublic';
import { EmptyAccessTokenError, RefreshTokenError } from './error';
import { errorTypes } from './errorTypes';

export const refreshTokenFn = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    if (!accessToken) {
      localStorage.removeItem('accessToken');
      throw new EmptyAccessTokenError();
    }
    const response = await axiosPublic.post('/api/auth/refresh', {
      accessToken,
    });

    const {
      data: { data },
    } = response;

    localStorage.setItem('accessToken', data.accessToken);

    return data.accessToken;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { errorType } = error.response.data;
        if (
          errorType === errorTypes.E011 ||
          errorType === errorTypes.E012 ||
          errorType === errorTypes.E023
        ) {
          localStorage.removeItem('accessToken');
          throw new RefreshTokenError(error);
        }
      }
    } else if (error instanceof EmptyAccessTokenError) {
      throw new EmptyAccessTokenError();
    }
  }
};
