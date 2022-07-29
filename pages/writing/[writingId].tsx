import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import WritingLayout from '../../components/writing-layout';
import { IWriting } from '../../types/IWriting';

const Detail = () => {
  const [writing, setWriting] = useState<IWriting>();
  useEffect(() => {
    const data = localStorage.getItem('writingItem');
    if (data) {
      setWriting(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <Head>
        <title>글감 - {writing?.title}</title>
      </Head>
      <main className='main bg-white'>
        <div className='bg-white pt-16'>
          {writing && (
            <>
              <div className='flex flex-col gap-4 px-6'>
                {writing?.imageUrl && (
                  <div className='relative h-[246px] w-[158px] self-center'>
                    <Image
                      src={writing?.imageUrl}
                      alt='book'
                      layout='fill'
                      objectFit='cover'
                      className='rounded-md'
                    />
                  </div>
                )}
                <h1 className='text-2xl font-bold'>{writing?.title}</h1>
                <p className='indent-4 text-[#666666]'>
                  {writing?.description}
                </p>
              </div>
              <a
                href={writing?.linkUrl}
                className='fixed inset-x-0 bottom-0 flex justify-center bg-black py-4 text-xl font-bold text-mint-main'
              >
                상세정보 보기
              </a>
            </>
          )}
        </div>
      </main>
    </>
  );
};

Detail.getLayout = function getLayout(page: ReactElement) {
  return (
    <WritingLayout>
      <Header leftChild={<BackButton />} style={'bg-white'} />
      {page}
    </WritingLayout>
  );
};
export default Detail;
