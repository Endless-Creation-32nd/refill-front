import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import fetchData from '../utils/fetchData';
import { axiosPrivate } from '../utils/axiosPrivate';
import { errorTypes } from '../utils';

import CustomAvatar from '../components/CustomAvatar';
import Header from '../components/header';
import Layout from '../components/layout';
import Nav from '../components/nav';

import { IProfile } from '../types/IProfile';
import { IUser } from '../types/IUser';

import Character from '../assets/character.svg';
import Setting from '../assets/mypage_setting.svg';

interface Transcription {
  transcriptionId: number;
  image: string;
}

const PAGE_SIZE = 10;

const Mypage = () => {
  const { data: userData } = useSWR<IUser>('/api/auth', fetchData);
  const { data: profileData } = useSWR<IProfile>(
    userData ? `/api/member/${userData.memberId}` : null,
    fetchData
  );
  const {
    data: transcriptionData,
    error,
    size,
    setSize,
  } = useSWRInfinite<Transcription[]>(
    (index) =>
      userData
        ? `/api/member/${userData.memberId}/transcription?page=${index}&count=${PAGE_SIZE}`
        : null,
    fetchData
  );
  const router = useRouter();

  const transcriptions = transcriptionData
    ? ([] as Transcription[]).concat(...transcriptionData)
    : [];
  const isLoading = transcriptions && !transcriptionData && !error;
  const isEmpty = transcriptionData?.[0]?.length === 0;

  return (
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
        <section></section>
      </section>

      <section className='p-6'>
        <h3 className='mb-2 text-xl font-semibold'>필사기록</h3>
        {isEmpty && <p>작성한 필사가 없습니다.</p>}
        <ul className='grid w-full grid-cols-[repeat(3,_1fr)] gap-1 sm:gap-7'>
          {transcriptionData &&
            transcriptionData.flat().map((transcription, index) => {
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
      </section>
      <Link href={`/write?p=${userData?.memberId}`}>
        <a className='fixed bottom-24 right-1/2 translate-x-1/2 rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md'>
          내 필사 올리기
        </a>
      </Link>
    </div>
  );
};

Mypage.getLayout = function getLayout(page: ReactElement) {
  const leftChild = <h1 className='tab-title'>마이페이지</h1>;
  const rightChild = (
    <Link href='/setting'>
      <a>
        <Setting />
      </a>
    </Link>
  );
  return (
    <Layout>
      <Header
        leftChild={leftChild}
        rightChild={rightChild}
        style={'bg-white'}
      />
      <main className='main bg-bgColor'>
        <div className='bg-bgColor pt-16'>{page}</div>
      </main>
      <Nav />
    </Layout>
  );
};
export default Mypage;
