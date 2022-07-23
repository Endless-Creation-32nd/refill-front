import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useContext } from 'react';
import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Layout from '../../components/layout';
import WritingLayout from '../../components/writing-layout';
import { WritingContext } from '../../libs/WritingContext';

const Detail = () => {
  const context = useContext(WritingContext);
  const router = useRouter();
  if (!context) return null;
  const {
    writing: { title, imageUrl, description, linkUrl },
  } = context;
  return (
    <>
      <Head>
        <title>글감 - {title}</title>
      </Head>
      <main className='bg-gray-100'>
        <div className='common-layout bg-white'>
          <div className='flex flex-col p-4'>
            <div className='relative h-[246px] w-[158px] self-center'>
              <Image
                src={imageUrl}
                alt='book'
                layout='fill'
                objectFit='cover'
                className='rounded-md'
              />
            </div>
            <h1 className='mt-2 text-2xl font-bold'>{title}</h1>
            <p className='mt-4 indent-2 text-[#666666]'>{description}</p>
          </div>
          <a
            href={linkUrl}
            className='sticky inset-x-0 bottom-0 flex justify-center bg-black py-4 text-xl font-bold text-mint-main'
          >
            상세정보 보기
          </a>
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
