import { ReactElement } from 'react';
import useSWR from 'swr';
import GroupLayout from '../components/group-layout';
import GroupItem from '../components/GroupItem';
import { IGroup } from '../types/IGroup';
import fetchData from '../utils/fetchData';
import Person from '../assets/search_person.svg';
import Period from '../assets/search_period.svg';
import Count from '../assets/search_count.svg';
import Penalty from '../assets/search_penalty.svg';
import SearchHeader from '../components/search-header';
import Head from 'next/head';

const Search = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recommendation',
    fetchData
  );
  return (
    <>
      <Head>
        <title>그룹 검색</title>
      </Head>
      <div className='bg-white px-6 pb-6'>
        <ul className='flex h-full justify-between divide-x divide-black justify-self-center rounded-lg border border-light-gray p-3 text-sm'>
          <li className='flex flex-1 items-center justify-center gap-1'>
            <Person width='20' height='20' fill='#1C1C1E' />
            <button>인원</button>
          </li>
          <li className='flex flex-1 items-center justify-center gap-1'>
            <Period />
            <button>기간</button>
          </li>
          <li className='flex flex-1 items-center justify-center gap-1'>
            <Count />
            <button>횟수</button>
          </li>
          <li className='flex flex-1 items-center justify-center gap-1'>
            <Penalty />
            <button>패널티</button>
          </li>
        </ul>
      </div>

      <ul className='flex flex-col gap-3 bg-bgColor p-6'>
        {groupData &&
          (groupData.length !== 0 ? (
            groupData.map((group) => {
              return <GroupItem key={group.groupId} group={group} />;
            })
          ) : (
            <p>추천 그룹 없음</p>
          ))}
      </ul>
    </>
  );
};
Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <GroupLayout>
      <SearchHeader />
      <main className='main bg-bgColor'>
        <div className='bg-bgColor pt-16'>{page}</div>
      </main>
    </GroupLayout>
  );
};
export default Search;
