import { ReactElement } from 'react';
import useSWR from 'swr';
import BackButton from '../components/BackButton';
import GroupLayout from '../components/group-layout';
import GroupItem from '../components/GroupItem';
import Header from '../components/header';
import { IGroup } from '../types/IGroup';
import fetchData from '../utils/fetchData';
import Person from '../assets/search_person.svg';
import Period from '../assets/search_period.svg';
import Count from '../assets/search_count.svg';
import Penalty from '../assets/search_penalty.svg';
import SearchHeader from '../components/search-header';

const Search = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recommendation',
    fetchData
  );
  return (
    <>
      <div className='bg-white px-6 pb-6'>
        <ul className='flex h-full justify-between justify-self-center rounded-lg border border-light-gray p-3 text-sm'>
          <li className='flex flex-1 items-center justify-center gap-1 border border-white border-r-black'>
            <Person />
            <button>인원</button>
          </li>
          <li className='flex flex-1 items-center justify-center gap-1 border border-white border-r-black'>
            <Period />
            <button>기간</button>
          </li>
          <li className='flex flex-1 items-center justify-center gap-1 border border-white border-r-black'>
            <Count />
            <button>횟수</button>
          </li>
          <li className='flex flex-1 items-center justify-center gap-1'>
            <Penalty />
            <button>패널티</button>
          </li>
        </ul>
      </div>

      <ul className='flex flex-col gap-3 bg-bgColor p-4'>
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
      <main className='bg-gray-200'>
        <div className='common-layout bg-bgColor'>{page}</div>
      </main>
    </GroupLayout>
  );
};
export default Search;
