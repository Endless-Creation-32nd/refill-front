import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Home from '../assets/nav_home.svg';
import ActiveHome from '../assets/nav_home_active.svg';
import Writing from '../assets/nav_writing.svg';
import ActiveWriting from '../assets/nav_writing_active.svg';
import Group from '../assets/nav_group.svg';
import ActiveGroup from '../assets/nav_group_active.svg';
import Mypage from '../assets/nav_mypage.svg';
import ActiveMypage from '../assets/nav_mypage_active.svg';

const navData = [
  {
    id: 'nav100',
    name: '홈',
    path: '/',
    query: {},
    icon: <Home />,
    activeIcon: <ActiveHome />,
  },
  {
    id: 'nav200',
    name: '글감',
    path: '/writing',
    query: { category: '문학' },
    icon: <Writing />,
    activeIcon: <ActiveWriting />,
  },
  {
    id: 'nav300',
    name: '그룹',
    path: '/group',
    query: {},
    icon: <Group />,
    activeIcon: <ActiveGroup />,
  },
  {
    id: 'nav400',
    name: '마이페이지',
    path: '/mypage',
    query: {},
    icon: <Mypage />,
    activeIcon: <ActiveMypage />,
  },
];

const Nav = () => {
  const router = useRouter();
  return (
    <nav className='fixed inset-x-0 bottom-0 h-[72px] bg-white shadow-xl'>
      <ul className='flex h-full justify-center'>
        {navData.map((nav) => {
          return (
            <li
              key={nav.id}
              className='flex flex-1 items-center justify-center'
            >
              <Link href={{ pathname: nav.path, query: nav.query }}>
                <a className='flex flex-col items-center'>
                  <span>
                    {nav.path === router.pathname ? nav.activeIcon : nav.icon}
                  </span>
                  <span
                    className={`text-[10px] ${
                      nav.path === router.pathname
                        ? 'text-black'
                        : 'text-[#e4e4e4]'
                    }`}
                  >
                    {nav.name}
                  </span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Nav;
