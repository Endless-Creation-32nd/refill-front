import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSWRInfinite from 'swr/infinite';

import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Layout from '../../components/layout';
import fetchData from '../../utils/fetchData';

const PAGE_SIZE = 10;

interface Transcription {
  transcriptionId: number;
  image: string;
}
const BookmarkPage = () => {
  const router = useRouter();
  const { query } = router;

  const {
    data: transcriptionData,
    error,
    size,
    setSize,
  } = useSWRInfinite<Transcription[]>(
    (index) =>
      query.memberId
        ? `/api/member/${query.memberId}/bookmark?page=${index}&count=${PAGE_SIZE}`
        : null,
    fetchData
  );

  const transcriptions = transcriptionData
    ? ([] as Transcription[]).concat(...transcriptionData)
    : [];
  const isLoading = transcriptions && !transcriptionData && !error;
  const isEmpty = transcriptionData?.[0]?.length === 0;
  return (
    <>
      <section className='px-6 pb-6'>
        <h3 className='mb-2 text-xl font-semibold'>북마크</h3>
        {isEmpty && <p className='m-auto text-sm'>저장한 북마크가 없습니다.</p>}
        <ul className='grid w-full grid-cols-[repeat(3,_1fr)] gap-1 sm:gap-7'>
          {transcriptions.map((transcription, index) => {
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
