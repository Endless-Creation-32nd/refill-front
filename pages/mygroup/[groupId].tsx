import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ReactElement, useState } from 'react';
import { IGroup, IMember } from '../../types/IGroup';
import { IUser } from '../../types/IUser';
import BackButton from '../../components/BackButton';
import CustomAvatar from '../../components/CustomAvatar';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import Bookmark from '../../assets/bookmark.svg';
import Comment from '../../assets/comment.svg';
import Person from '../../assets/search_person.svg';
import Setting from '../../assets/member_setting.svg';
import fetchData from '../../utils/fetchData';

const transcription = {
  memberId: 3,
  image: null,
  nickname: '오정진',
  transcriptionImage:
    'http://www.kpipa.or.kr/upload/book/KP0062/1384146725654_4162.jpg',
  createdAt: '2022-07-25T23:00:11.965805',
  title: 'hello world',
  bookmark: 5,
  comments: 5,
};
const member: IMember = {
  memberId: 4,
  nickname: '오정진',
  image: null,
  status: 'PARTICIPATE',
};

const MyGroup = () => {
  const { data: userData } = useSWR<IUser>('/api/auth', fetchData);
  const { data: myGroupData } = useSWR<IGroup>('/api/group', fetchData);
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const leftChild = (
    <button
      className='z-50 flex cursor-pointer items-center text-white'
      onClick={() => setShowSidebar(!showSidebar)}
    >
      <span className='pt-1 text-xl font-thin'>
        {myGroupData?.participationMembers.length}
      </span>
      <Person width='24' height='24' fill='#ffffff' />
    </button>
  );

  const onCloseSidebar = () => {
    setShowSidebar(false);
  };
  const onClickTranscription = () => {};
  return (
    <>
      <Header
        leftChild={<BackButton style={'text-white'} />}
        middleChild={<h3 className='tab-middle-title text-white'>내 그룹</h3>}
        rightChild={leftChild}
        style={'bg-black'}
      />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>
          <div className='relative h-[270px] w-[1px] min-w-full'>
            <div className='absolute bottom-4 left-4 z-[1] py-[2px] px-2'>
              <h3 className='mb-3 text-2xl font-semibold text-white'>
                {myGroupData?.name}
              </h3>
              <ul className='flex flex-wrap gap-2'>
                {myGroupData?.tagList.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className='rounded-[4px] bg-mint-main px-2 py-1 text-xs text-black'
                    >
                      # {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Image
              src='/images/mygroup-image.png'
              alt='logo'
              objectFit='cover'
              layout='fill'
            />
          </div>
          <ul className='py-3 px-6'>
            <li key={transcription.memberId} className='mb-5'>
              <div className='flex items-center gap-2'>
                <CustomAvatar
                  member={member}
                  width={'w-8'}
                  height={'h-8'}
                  size={'32'}
                />
                <span>{transcription.nickname}</span>
              </div>
              <dl className='mt-2 rounded-lg border'>
                <div className='relative h-[300px] w-full'>
                  <Image
                    src={transcription.transcriptionImage}
                    alt='member'
                    objectFit='cover'
                    layout='fill'
                    className='rounded-t-lg'
                  />
                </div>
                <div className='px-4 py-2'>
                  <dt>{transcription.title}</dt>
                  <div className='flex items-center justify-between gap-1'>
                    <dd className='flex gap-3'>
                      <span className='flex items-center gap-1'>
                        <Bookmark />
                        {transcription.bookmark}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Comment />
                        {transcription.comments}
                      </span>
                    </dd>
                    <dd className='mt-2 text-sm text-middle-gray'>
                      {dayjs(transcription.createdAt).format('YYYY.MM.DD')}
                    </dd>
                  </div>
                </div>
              </dl>
            </li>
          </ul>
        </div>
      </main>

      <Sidebar show={showSidebar} onCloseSidebar={onCloseSidebar}>
        <div className='m-auto min-h-[300px] w-full px-4'>
          <h3 className='sticky top-0 z-10 flex items-center gap-2 border-b border-b-gray-300 bg-white py-4 text-xl font-semibold'>
            그룹멤버
            {userData?.memberId === myGroupData?.adminId && (
              <Link href={`/group/admin?groupId=${myGroupData?.groupId}`}>
                <a>
                  <Setting />
                </a>
              </Link>
            )}
          </h3>
          <ul className='flex flex-col gap-4 py-4'>
            {myGroupData?.participationMembers &&
              myGroupData?.participationMembers.map((member) => {
                return (
                  <li key={member.memberId} className='flex items-center gap-2'>
                    <CustomAvatar
                      member={member}
                      width={'w-8'}
                      height={'h-8'}
                      size={'32'}
                    />
                    <div className='flex-1'>{member.nickname}</div>
                    <span>{member.nickname}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </Sidebar>
      <button
        type='button'
        onClick={() => router.push(`/transcription/${myGroupData?.groupId}`)}
        className='fixed inset-x-0 bottom-0  bg-black py-4 text-xl font-bold text-mint-main'
      >
        필사 올리기
      </button>
    </>
  );
};
MyGroup.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MyGroup;
