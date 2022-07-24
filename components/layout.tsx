import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactNode } from 'react';
import useSWR from 'swr';
import { errorTypes } from '../utils';
import { checkAccessToken } from '../utils/checkAccessToken';
import Header from './header';
import Nav from './nav';

interface PropsType {
  leftChild?: ReactNode | JSX.Element;
  middleChild?: ReactNode | JSX.Element;
  rightChild?: ReactNode | JSX.Element;
  hasNav?: boolean;
}

const Layout = ({
  leftChild,
  middleChild,
  rightChild,
  hasNav = true,
  children,
}: PropsWithChildren<PropsType>) => {
  const { data, error } = useSWR('/api/auth', checkAccessToken);
  const router = useRouter();

  const refreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      if (!accessToken) {
        router.replace('/login');
      }
      const response = await axios.post('/api/auth/refresh', {
        accessToken,
      });
      const {
        data: { data },
      } = response;
      localStorage.setItem('accessToken', data.accessToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const { errorType } = error.response.data;
          if (
            errorType === errorTypes.INVALID_INPUT ||
            errorType === errorTypes.AUTHENTICATION_FAIL ||
            errorType === errorTypes.NOT_LOGIN_MEMBER ||
            errorType === errorTypes.INVALID_MEMBER
          ) {
            router.replace('/login');
          }
        }
      }
    }
  };

  if (error) {
    const { message } = error;
    if (message === errorTypes.AUTHENTICATION_FAIL) {
      refreshToken();
    }
  }

  return <>{children}</>;
};
export default Layout;
