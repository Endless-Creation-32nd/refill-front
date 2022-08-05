import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';

import fetchData from '../../utils/fetchData';
import { useInfiniteScroll } from '../../utils/useInfiniteScroll';

import CustomAvatar from '../../components/CustomAvatar';
import Header from '../../components/header';
import Layout from '../../components/layout';
import BackButton from '../../components/BackButton';
import Loading from '../../components/loading';
import ToTopButton from '../../components/ToTopButton';

import { IProfile } from '../../types/IProfile';

import Character from '../../assets/character.svg';

interface Transcription {
  transcriptionId: number;
  image: string;
}

const PAGE_SIZE = 10;
const SCROLL_TO_TOP_BUTTON = 1000;

const ProfilePage = () => {
  const router = useRouter();
  const { query } = router;

  const [showToTopButton, setShowToTopButton] = useState(false);

  const { data: profileData } = useSWR<IProfile>(
    query.memberId ? `/api/member/${query.memberId}` : null,
    fetchData
  );

  const {
    data: transcriptionList,
    setSize,
    isEmpty,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
  } = useInfiniteScroll<Transcription>((index) =>
    query.memberId
      ? `/api/member/${query.memberId}/transcription?page=${index}&count=${PAGE_SIZE}`
      : null
  );

  // const {
  //   data: transcriptionData,
  //   error,
  //   size,
  //   setSize,
  // } = useSWRInfinite<Transcription[]>(
  //   (index) =>
  //     query.memberId
  //       ? `/api/member/${query.memberId}/transcription?page=${index}&count=${PAGE_SIZE}`
  //       : null,
  //   fetchData
  // );

  // const transcriptionList = transcriptionData
  //   ? ([] as Transcription[]).concat(...transcriptionData)
  //   : [];
  // const isEmpty = transcriptionData?.[0]?.length === 0;
  // const isLoadingInitialData = !transcriptionData && !error;
  // const isLoadingMore =
  //   size > 0 &&
  //   transcriptionData &&
  //   typeof transcriptionData[size - 1] === 'undefined';
  // const isReachingEnd =
  //   isEmpty ||
  //   (transcriptionData &&
  //     transcriptionData[transcriptionData.length - 1]?.length < PAGE_SIZE);

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

  return (
    <>
      <Head>
        <title>{profileData?.nickname}의 프로필</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <div>
        <section className='bg-white px-6 pb-6'>
          <section className='divide-y rounded-lg border bg-white'>
            {profileData && (
              <>
                <section className='flex items-center gap-4 rounded-t-lg px-4 py-4'>
                  <CustomAvatar
                    image={profileData.image}
                    nickname={profileData.nickname}
                    width={'w-16'}
                    height={'h-16'}
                    size={'64'}
                  />
                  <div className='flex flex-1 flex-col gap-[6px]'>
                    <span className='text-lg font-semibold'>
                      {profileData.nickname}
                    </span>
                    <span className='text-xs'>
                      {profileData.groupName ? (
                        <span className='rounded-[4px] bg-mint-main px-2 py-1'>
                          그룹 참여 중
                        </span>
                      ) : (
                        <span className='rounded-[4px] border border-mint-main px-2 py-1'>
                          그룹 참여하기
                        </span>
                      )}
                    </span>
                  </div>
                  <Character width={47} height={83} />
                </section>

                <ul className='flex divide-x py-4'>
                  <li className='flex flex-1 flex-col items-center justify-center'>
                    <span className='text-xl font-bold'>
                      {profileData.uploadCount}
                    </span>
                    <span className='text-xs text-middle-gray'>업로드</span>
                  </li>
                  <li className='flex-1'>
                    <Link href={`/bookmark/${profileData.memberId}`}>
                      <a className='flex flex-col items-center justify-center'>
                        <span className='text-xl font-bold'>
                          {profileData.bookMarkCount}
                        </span>
                        <span className='text-xs text-middle-gray'>북마크</span>
                      </a>
                    </Link>
                  </li>
                  <li className='flex flex-1 flex-col items-center justify-center'>
                    <span className='text-xl font-bold'>
                      {profileData.penaltyCount}
                    </span>
                    <span className='text-xs text-middle-gray'>패널티</span>
                  </li>
                </ul>
              </>
            )}
          </section>
        </section>

        <section className='flex flex-col p-6'>
          <h3 className='mb-2 text-xl font-semibold'>필사기록</h3>
          {isLoadingInitialData && (
            <div className='m-auto'>
              <Loading />
            </div>
          )}
          {isEmpty && <p className='m-auto text-sm'>작성한 필사가 없습니다.</p>}
          <ul className='grid w-full grid-cols-[repeat(3,_1fr)] gap-1 sm:gap-7'>
            {transcriptionList.map((transcription) => {
              return (
                <li
                  key={transcription.transcriptionId}
                  className='relative w-full after:block after:pb-[100%] after:content-[""]'
                >
                  <div className='absolute h-full w-full'>
                    <Link
                      href={`/transcription/${transcription.transcriptionId}`}
                    >
                      <a>
                        <Image
                          src={transcription.image}
                          alt='필사'
                          objectFit='contain'
                          layout='fill'
                        />
                      </a>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          {isLoadingMore && (
            <div className='m-auto'>
              <Loading />
            </div>
          )}
        </section>
      </div>
      <ToTopButton show={showToTopButton} />
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Header leftChild={<BackButton />} style={'bg-white'} />
      <main className='main bg-bgColor'>
        <div className='bg-bgColor pt-16'>{page}</div>
      </main>
    </Layout>
  );
};
export default ProfilePage;
