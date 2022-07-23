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
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('/api/auth/refresh', {
        data: { accessToken },
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
            errorType === errorTypes.AUTHENTICATION_FAIL
          ) {
            router.replace('/login');
          }
          // throw new Error(errorType);
        }
        // console.log(error);
      }
    }
  };

  if (error) {
    const { message } = error;
    if (
      message === errorTypes.AUTHENTICATION_FAIL ||
      message === errorTypes.INVALID_INPUT
    ) {
      refreshToken();
    }
  }

  return (
    <>
      <Header
        leftChild={leftChild}
        middleChild={middleChild}
        rightChild={rightChild}
      />
      <main className='bg-gray-300'>
        <div className='mx-auto my-0 min-h-screen bg-white md:w-3/4 lg:w-[768px]'>
          {children}
        </div>
      </main>
      {hasNav && <Nav />}
    </>
  );
};
export default Layout;
