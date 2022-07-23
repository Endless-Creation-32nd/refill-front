import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';

const Login: NextPage = () => {
  return (
    <div className='h-full'>
      <div className='relative z-10 h-[35px] w-[112px]'>
        <Image
          src='/images/logo_mint.png'
          alt='logo'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <form>
        <div>
          <input name='email' type='email' placeholder='이메일' />
        </div>
        <div>
          <input name='password' type='password' placeholder='비밀번호' />
        </div>
      </form>
      <div className='flex flex-col'>
        <button>로그인</button>
        <button>카카오톡</button>
        <button>구글</button>
      </div>
      <div>
        아직 회원이 아니라면?
        <Link href='/signup'>
          <a>회원가입하기</a>
        </Link>
      </div>
    </div>
  );
};
export default Login;
