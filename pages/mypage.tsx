import { useRouter } from 'next/router';
import { errorTypes } from '../utils';
import { axiosPrivate } from '../utils/axiosPrivate';

const Mypage = () => {
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
    <>
      <button onClick={onLogout}>logout</button>
    </>
  );
};
export default Mypage;
