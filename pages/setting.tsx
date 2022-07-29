import { useRouter } from 'next/router';
import { errorTypes } from '../utils';
import { axiosPrivate } from '../utils/axiosPrivate';

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
        if (error.errorType === errorTypes.E012) {
          router.replace('/login');
        }
      });
  };
  return (
    <div className='flex w-full justify-center p-6'>
      <button
        onClick={onLogout}
        className='w-full rounded-lg bg-black py-2 text-lg text-mint-main'
      >
        로그아웃
      </button>
    </div>
  );
};

export default Setting;
