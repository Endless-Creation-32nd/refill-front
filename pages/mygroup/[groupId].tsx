import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { ReactElement, useEffect, useState } from 'react';

import { IGroup } from '../../types/IGroup';
import { IUser } from '../../types/IUser';
import { IGroupTranscription } from '../../types/IGroupTranscription';

import fetchData from '../../utils/fetchData';

import BackButton from '../../components/BackButton';
import CustomAvatar from '../../components/CustomAvatar';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import Loading from '../../components/loading';
import ToTopButton from '../../components/ToTopButton';

import Bookmark from '../../assets/bookmark.svg';
import Comment from '../../assets/comment.svg';
import Person from '../../assets/search_person.svg';
import Setting from '../../assets/member_setting.svg';

const PAGE_SIZE = 10;
const SCROLL_TO_TOP_BUTTON = 1000;

const MyGroup = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const { data: userData } = useSWR<IUser>('/api/auth', fetchData);
  const { data: myGroupData } = useSWR<IGroup>('/api/group', fetchData);
  const {
    data: transcriptionData,
    error,
    size,
    setSize,
  } = useSWRInfinite<IGroupTranscription[]>(
    (index) =>
      myGroupData
        ? `/api/group/${myGroupData.groupId}/transcription?page=${index}&count=${PAGE_SIZE}`
        : null,
    fetchData
  );
  const [showToTopButton, setShowToTopButton] = useState(false);

  const transcriptionList = transcriptionData
    ? ([] as IGroupTranscription[]).concat(...transcriptionData)
    : [];
  const isEmpty = transcriptionData?.length === 0;
  const isLoadingInitialData = !transcriptionData && !error;
  const isLoadingMore =
    size > 0 &&
    transcriptionData &&
    typeof transcriptionData[size - 1] === 'undefined';
  const isReachingEnd =
    isEmpty ||
    (transcriptionData &&
      transcriptionData[transcriptionData.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    const onScroll = () => {
      const clientHeight = document.body.clientHeight;
      const scrollHeight = document.body.scrollHeight;
      const scrollY = window.scrollY;
      if (scrollY + clientHeight > scrollHeight - 100 && !isReachingEnd) {
        setSize((prevSize) => prevSize + 1);
      }
      setShowToTopButton(scrollY > SCROLL_TO_TOP_BUTTON);
    };
    if (typeof window) {
      document.addEventListener('scroll', onScroll);
    }
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [setSize, isReachingEnd]);

  const onCloseSidebar = () => {
    setShowSidebar(false);
  };

  const leftChild = (
    <button
      className='z-50 flex cursor-pointer items-center text-white'
      onClick={() => setShowSidebar(!showSidebar)}
    >
      <span className='text-xl font-thin'>
        {myGroupData?.participationMembers.length}
      </span>
      <Person width='24' height='24' fill='#ffffff' />
    </button>
  );

  return (
    <>
      <Head>
        <title>내 그룹</title>
      </Head>
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
              priority
            />
          </div>
          <ul className='flex flex-col py-3 px-6'>
            {isLoadingInitialData && (
              <div className='m-auto'>
                <Loading />
              </div>
            )}
            {isEmpty && <p>그룹 내 필사 목록이 없습니다.</p>}
            {transcriptionList.map((transcription) => {
              return (
                <li key={transcription.transcriptionId} className='mb-5'>
                  <Link
                    href={
                      userData?.memberId ===
                      transcription.participation.memberId
                        ? '/mypage'
                        : `/profile/${transcription.participation.memberId}`
                    }
                  >
                    <a>
                      <div className='flex items-center gap-2'>
                        <CustomAvatar
                          image={transcription.participation.image}
                          nickname={transcription.participation.nickname}
                          width={'w-8'}
                          height={'h-8'}
                          size={'32'}
                        />
                        <span>{transcription.participation.nickname}</span>
                      </div>
                    </a>
                  </Link>
                  <Link
                    href={`/transcription/${transcription.transcriptionId}`}
                  >
                    <a>
                      <dl className='mt-2 rounded-lg border'>
                        <div className='relative h-[300px] w-full'>
                          <Image
                            src={transcription.transcriptionImage}
                            alt='member'
                            objectFit='contain'
                            layout='fill'
                            className='rounded-t-lg'
                          />
                        </div>
                        <div className='px-4 py-2'>
                          <dt>{transcription.title}</dt>
                          <div className='flex items-center justify-between gap-1'>
                            <dd className='relative -left-2 flex gap-2'>
                              <span className='flex items-center gap-1'>
                                <Bookmark />
                                {transcription.bookmarkCount}
                              </span>
                              <span className='flex items-center gap-1'>
                                <Comment />
                                {transcription.commentCount}
                              </span>
                            </dd>
                            <dd className='mt-2 text-sm text-middle-gray'>
                              {dayjs(transcription.createdAt).format(
                                'YYYY.MM.DD'
                              )}
                            </dd>
                          </div>
                        </div>
                      </dl>
                    </a>
                  </Link>
                </li>
              );
            })}
            {isLoadingMore && (
              <div className='m-auto'>
                <Loading />
              </div>
            )}
          </ul>
          <ToTopButton show={showToTopButton} />
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
                  <li key={member.memberId}>
                    <Link
                      href={
                        userData?.memberId === member.memberId
                          ? '/mypage'
                          : `/profile/${member.memberId}`
                      }
                    >
                      <a className='flex items-center gap-2'>
                        <CustomAvatar
                          image={member.image}
                          nickname={member.nickname}
                          width={'w-8'}
                          height={'h-8'}
                          size={'32'}
                        />
                        <div className='flex-1 text-sm'>{member.nickname}</div>
                        {member.memberId === myGroupData?.adminId && (
                          <span className='text-xs text-mint-main'>방장</span>
                        )}
                        {member.penaltyCount !== 0 && (
                          <span className='text-xs text-warning'>
                            패널티 {member.penaltyCount}회
                          </span>
                        )}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </Sidebar>
      <button
        type='button'
        onClick={() => router.push('/write')}
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
