import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';

import { useInfiniteScroll } from '../../utils/useInfiniteScroll';

import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import ToTopButton from '../../components/ToTopButton';

const PAGE_SIZE = 10;
const SCROLL_TO_TOP_BUTTON = 1000;

interface Transcription {
  transcriptionId: number;
  image: string;
}
const BookmarkPage = () => {
  const router = useRouter();
  const { query } = router;

  const [showToTopButton, setShowToTopButton] = useState(false);

  const {
    data: transcriptionList,
    setSize,
    isEmpty,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
  } = useInfiniteScroll<Transcription>((index) =>
    query.memberId
      ? `/api/member/${query.memberId}/bookmark?page=${index}&count=${PAGE_SIZE}`
      : null
  );

  useEffect(() => {
    const throttledScroll = throttle(() => {
      const clientHeight = document.body.clientHeight;
      const scrollHeight = document.body.scrollHeight;
      const scrollY = window.scrollY;
      if (scrollY + clientHeight > scrollHeight - 100 && !isReachingEnd) {
        setSize((prevSize) => prevSize + 1);
      }
      setShowToTopButton(scrollY > SCROLL_TO_TOP_BUTTON);
    }, 1000);

    if (typeof window) {
      document.addEventListener('scroll', throttledScroll);
    }
    return () => {
      document.removeEventListener('scroll', throttledScroll);
    };
  }, [setSize, isReachingEnd]);

  return (
    <>
      <Head>
        <title>북마크 목록</title>
      </Head>
      <section className='flex flex-col px-6 pb-6'>
        <h3 className='mb-2 text-xl font-semibold'>북마크</h3>
        {isLoadingInitialData && (
          <div className='m-auto'>
            <Loading />
          </div>
        )}
        {isEmpty && <p className='m-auto text-sm'>저장한 북마크가 없습니다.</p>}
        <ul className='grid w-full grid-cols-[repeat(3,_1fr)] gap-1 sm:gap-7'>
          {transcriptionList.map((transcription, index) => {
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
      <ToTopButton show={showToTopButton} />
    </>
  );
};

BookmarkPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Header leftChild={<BackButton />} style={'bg-white'} />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>{page}</div>
      </main>
    </Layout>
  );
};
export default BookmarkPage;
