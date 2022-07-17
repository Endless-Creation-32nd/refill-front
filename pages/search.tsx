import useSWR from 'swr';
import BackButton from '../components/BackButton';
import GroupItem from '../components/GroupItem';
import Layout from '../components/layout';
import { IGroup } from '../types/IGroup';
import fetchData from '../utils/fetchData';

const Search = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recomandation',
    fetchData
  );
  const rightChild = <input className='flex-4 rounded-md bg-gray-400' />;
  return (
    <Layout leftChild={<BackButton />} rightChild={rightChild}>
      <div className='p-4'>
        <ul className='flex justify-between justify-self-center p-3'>
          <li className='flex-1 text-center'>
            <button>인원</button>
          </li>
          <li className='flex-1 text-center'>
            <button>기간</button>
          </li>
          <li className='flex-1 text-center'>
            <button>횟수</button>
          </li>
          <li className='flex-1 text-center'>
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
    </Layout>
  );
};

export default Search;
