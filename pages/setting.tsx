import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import BackButton from '../components/BackButton';
import Header from '../components/header';
import Layout from '../components/layout';
import { axiosPrivate } from '../utils/axiosPrivate';
import { RefreshTokenError, UserNotLoggedInError } from '../utils/error';

const Setting = () => {
  const router = useRouter();
  const onLogout = () => {
    axiosPrivate
      .get('/api/auth/logout')
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('accessToken');
          router.replace('/login');
        }
      })
      .catch((error) => {
        if (
          error instanceof UserNotLoggedInError ||
          error instanceof RefreshTokenError
        ) {
          router.replace('/login');
        }
      });
  };
  return (
    <>
      <Head>
        <title>설정</title>
      </Head>
      <div className='flex w-full justify-center p-6'>
        <button
          onClick={onLogout}
          className='w-full rounded-lg bg-black py-2 text-lg text-mint-main'
        >
          로그아웃
        </button>
      </div>
    </>
  );
};

Setting.getLayout = function getLayout(page: ReactElement) {
  const middleChild = <h1 className='tab-middle-title'>설정</h1>;
  return (
    <Layout>
      <Header
        leftChild={<BackButton />}
        middleChild={middleChild}
        style={'bg-white'}
      />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>{page}</div>
      </main>
    </Layout>
  );
};
export default Setting;
