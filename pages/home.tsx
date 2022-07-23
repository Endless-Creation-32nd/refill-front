import type { NextPage } from 'next';
import useSWR from 'swr';
import GroupItem from '../components/GroupItem';
import Layout from '../components/layout';
import { IGroup } from '../types/IGroup';
import fetchData from '../utils/fetchData';

const MainPage: NextPage = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recomandation',
    fetchData
  );

  return (
    <Layout>
      <div className='h-screen bg-black'>
        <div className='mx-6 pt-[148px] pb-8 text-white'>
          <h1 className='text-3xl font-extrabold'>Refill</h1>
          <div className='text-xl'>
            <p>
              안녕하세요 <span className='text-mint-main'>USER NAME</span>님,
            </p>
            <p>오늘도 필사해볼까요?</p>
          </div>
        </div>
        <div className='rounded-t-xl bg-white p-6'>
          <div>
            <h3 className='text-xl'>오늘의 글감</h3>
          </div>
          <div>
            <h3 className='text-xl'>추천그룹</h3>
            <ul className='mt-3 grid grid-cols-2 gap-3'>
              {groupData &&
                (groupData.length !== 0 ? (
                  groupData.map((group) => {
                    return <GroupItem key={group.groupId} group={group} />;
                  })
                ) : (
                  <p>추천 그룹 없음</p>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;
