import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='fixed inset-x-0 bottom-0'>
      <ul className='flex justify-center bg-white'>
        <li className='flex-1'>
          <Link href='/'>
            <a>홈</a>
          </Link>
        </li>
        <li className='flex-1'>
          <Link href='/writing?category=문학'>
            <a>글감</a>
          </Link>
        </li>
        <li className='flex-1'>
          <Link href='/group'>
            <a>그룹</a>
          </Link>
        </li>
        <li className='flex-1'>
          <Link href='/mypage'>
            <a>마이페이지</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
