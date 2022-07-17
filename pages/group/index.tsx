import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import GroupItem from '../../components/GroupItem';
import Layout from '../../components/layout';
import { IGroup } from '../../types/IGroup';
import fetchData from '../../utils/fetchData';

const leftChild = <h1 className='text-2xl font-bold'>그룹</h1>;
const rightChild = (
  <Link href='/make-group'>
    <a className='rounded-full bg-mint-main py-1 px-3 text-sm'>그룹 만들기</a>
  </Link>
);

const GroupMain = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recomandation',
    fetchData
  );
  const router = useRouter();

  return (
    <Layout leftChild={leftChild} rightChild={rightChild}>
      <div className='flex flex-col bg-bgColor p-4'>
        <div className='mt-4 rounded-lg bg-gradient-to-br from-[#212121] to-[#434343] p-4'>
          <h3 className='text-lg font-thin text-white'>
            원하는 <span className='font-bold'>그룹</span>을 찾아보세요!
          </h3>
          <button
            className='flex w-full rounded-lg bg-white p-2'
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
    </Layout>
  );
};

export default GroupMain;
