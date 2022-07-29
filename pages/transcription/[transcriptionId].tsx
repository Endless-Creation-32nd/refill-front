import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSWR from 'swr';

import { IUserTranslation } from '../../types/IUserTranscription';

import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Loading from '../../components/loading';

import Bookmark from '../../assets/bookmark.svg';
import Comment from '../../assets/comment.svg';

import fetchData from '../../utils/fetchData';
const TranscriptionDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { data: transcriptionItem, error } = useSWR<IUserTranslation>(
    query.transcriptionId
      ? `/api/transcription/${query.transcriptionId}`
      : null,
    fetchData
  );
  const isLoading = !transcriptionItem && !error;

  return (
    <>
      <div className='flex flex-col px-6'>
        {isLoading && (
          <div className='m-auto flex justify-center'>
            <Loading />
          </div>
        )}
        {transcriptionItem && (
          <>
            <div className='relative h-[328px] w-full rounded-lg border'>
              <Image
                src={transcriptionItem.image}
                alt='필사 이미지'
                objectFit='contain'
                layout='fill'
                className='rounded-lg'
              />
            </div>
            <section className='divide-y'>
              <div className='flex gap-4 py-4'>
                <div className='flex flex-1 flex-col gap-1'>
                  <h3 className='text-xl font-semibold'>
                    {transcriptionItem.title}
                  </h3>
                  <div className='text-xs'>{transcriptionItem.author}</div>
                  {transcriptionItem.original && (
                    <a
                      className='break-all text-xs text-sky-500 underline'
                      target='_blank'
                      rel='noreferrer'
                      href={transcriptionItem.original}
                    >
                      {transcriptionItem.original}
                    </a>
                  )}
                </div>
                <div className='flex gap-3'>
                  <Comment />
                  <Bookmark />
                </div>
              </div>

              {transcriptionItem.wordList.map((word) => {
                return (
                  <div key={word.wordId} className='py-4'>
                    <div className='mb-2 w-min rounded-[4px] bg-black py-[2px] px-1 text-xs font-semibold text-mint-main'>
                      {word.word}
                    </div>
                    <div className='indent-2 text-sm'>
                      <span>{word.pos && `⌜${word.pos}⌟`}</span>{' '}
                      <span>{word.cat && `『${word.cat}』`}</span>{' '}
                      <span>{word.definition}</span>
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        )}
      </div>
    </>
  );
};

TranscriptionDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Header leftChild={<BackButton />} style={'bg-white'} />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>{page}</div>
      </main>
    </Layout>
  );
};
export default TranscriptionDetail;
