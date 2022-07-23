import axios, { AxiosError } from 'axios';
import { errorTypes } from './errorTypes';

export const checkAccessToken = async (url: string) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    if (!accessToken) {
      throw new Error(errorTypes.AUTHENTICATION_FAIL);
    }
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const response = await axios.get(url, config);
    const {
      data: { data },
    } = response;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { errorType } = error.response.data;
        throw new Error(errorType);
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
};
