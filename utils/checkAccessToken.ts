import axios, { AxiosError } from 'axios';
import { errorTypes } from './errorTypes';

export const checkAccessToken = async (url: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
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
    }
    throw new Error(errorTypes.UNHANDLED_ERROR);
  }
};
