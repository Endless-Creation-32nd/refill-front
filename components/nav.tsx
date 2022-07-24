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
    name: 'home',
    path: '/',
    query: {},
    icon: <Home />,
    activeIcon: <ActiveHome />,
  },
  {
    id: 'nav200',
    name: 'writing',
    path: '/writing',
    query: { category: '문학' },
    icon: <Writing />,
    activeIcon: <ActiveWriting />,
  },
  {
    id: 'nav300',
    name: 'group',
    path: '/group',
    query: {},
    icon: <Group />,
    activeIcon: <ActiveGroup />,
  },
  {
    id: 'nav400',
    name: 'mypage',
    path: '/mypage',
    query: {},
    icon: <Mypage />,
    activeIcon: <ActiveMypage />,
  },
];

const Nav = () => {
  const router = useRouter();
  return (
    <nav className='sticky inset-x-0 bottom-0'>
      <ul className='flex justify-center bg-white'>
        {navData.map((nav) => {
          return (
            <li key={nav.id} className='flex-1'>
              <Link href={{ pathname: nav.path, query: nav.query }}>
                <a>
                  {nav.path === router.pathname ? nav.activeIcon : nav.icon}
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
