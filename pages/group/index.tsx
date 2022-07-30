import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSWR from 'swr';
import GroupLayout from '../../components/group-layout';
import GroupItem from '../../components/GroupItem';
import Header from '../../components/header';
import Nav from '../../components/nav';
import { IGroup } from '../../types/IGroup';
import fetchData from '../../utils/fetchData';
import SmallCharacters from '../../assets/small_characters.svg';
import Head from 'next/head';

const TAG_LIST = ['취준', '문학', '취미'];
const GroupMain = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recommendation',
    fetchData
  );
  const router = useRouter();

  return (
    <>
      <Head>
        <title>그룹</title>
      </Head>
      <div className='h-full p-6'>
        <div className='mt-4 rounded-lg bg-gradient-to-br from-[#212121] to-[#434343] p-4'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-lg font-thin text-white'>
                원하는 <span className='font-bold'>그룹</span>을 찾아보세요!
              </h3>
              <ul className='flex gap-2'>
                {TAG_LIST.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className='rounded-[4px] bg-mint-main px-2 py-1 text-xs'
                    >
                      # {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <SmallCharacters />
          </div>
          <button
            className='mt-2 flex w-full rounded-lg bg-white p-2'
            onClick={() => router.push('/search')}
          >
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </button>
        </div>
        <div className='mt-10'>
          <h3 className='text-xl font-bold'>추천그룹</h3>
          {groupData &&
            (groupData.length !== 0 ? (
              <ul className='mt-3 grid grid-cols-2 gap-3'>
                {groupData.map((group) => {
                  return <GroupItem key={group.groupId} group={group} />;
                })}
              </ul>
            ) : (
              <p className='text-center'>
                추천그룹을 조회하기 위한 그룹 수가 부족합니다.
                <br />
                <span className='italic'>그룹을 직접 생성해보세요!</span>
              </p>
            ))}
        </div>
      </div>
    </>
  );
};
GroupMain.getLayout = function getLayout(page: ReactElement) {
  const leftChild = <h1 className='tab-title'>그룹</h1>;
  const rightChild = (
    <Link href='/make-group'>
      <a className='rounded-full bg-mint-main py-1 px-3 text-sm'>그룹 만들기</a>
    </Link>
  );
  return (
    <GroupLayout>
      <Header
        leftChild={leftChild}
        rightChild={rightChild}
        style={'bg-bgColor'}
      />
      <main className='main bg-bgColor'>
        <div className='bg-bgColor pt-16'>{page}</div>
      </main>
      <Nav />
    </GroupLayout>
  );
};
export default GroupMain;
