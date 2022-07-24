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

const Search = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recommendation',
    fetchData
  );
  const rightChild = <input className='flex-4 rounded-md bg-gray-400' />;
  return (
    <>
      <div className='bg-white p-6'>
        <ul className='flex justify-between justify-self-center rounded-lg border border-light-gray p-3 text-sm'>
          <li className='flex flex-1 items-center gap-2 text-center'>
            <Person />
            <button>인원</button>
          </li>
          <li className='flex flex-1 items-center gap-2 text-center'>
            <Period />
            <button>기간</button>
          </li>
          <li className='flex flex-1 items-center gap-2 text-center'>
            <Count />
            <button>횟수</button>
          </li>
          <li className='flex flex-1 items-center gap-2 text-center'>
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
      <Header leftChild={<BackButton />} style={'bg-white'} />
      <main className='bg-gray-200'>
        <div className='common-layout bg-bgColor'>{page}</div>
      </main>
    </GroupLayout>
  );
};
export default Search;
