import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';
import fetchData from '../../utils/fetchData';
import styled from '@emotion/styled';
import { ReactElement, UIEvent, useEffect, useRef } from 'react';
import WritingLayout from '../../components/writing-layout';
import Head from 'next/head';
import Header from '../../components/header';
import { IWriting } from '../../types/IWriting';
import Nav from '../../components/nav';
import Loading from '../../components/loading';

const LITERATURE = 'LITERATURE';
const COLUMN = 'COLUMN';
const FOREIGN = 'FOREIGN';
const ARTICLE = 'ARTICLE';
const OTHER = 'OTHER';

const WRITING_LIST = {
  문학: LITERATURE,
  '시사﹒칼럼': COLUMN,
  외국어: FOREIGN,
  기사: ARTICLE,
  기타: OTHER,
};
type categoryType = '문학' | '시사﹒칼럼' | '외국어' | '기사' | '기타';

const PAGE_SIZE = 10;

const Writing = () => {
  const router = useRouter();
  const { query } = router;
  const {
    data: writingData,
    mutate,
    setSize,
  } = useSWRInfinite<IWriting[]>(
    (index) =>
      query.category &&
      `/api/writing?category=${
        WRITING_LIST[query.category as categoryType]
      }&page=${index}&count=${PAGE_SIZE}`,
    fetchData
  );
  const isEmpty = writingData?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (writingData && writingData[writingData.length - 1]?.length < PAGE_SIZE);
  const scrollRef = useRef();

  const onClickBookDescription = (writingItem: IWriting) => {
    localStorage.setItem('writingItem', JSON.stringify(writingItem));
    router.push(`/writing/${writingItem.writingId}`);
  };

  // useEffect(() => {
  //   function onScroll(e) {
  //     console.log(e);
  //   }
  //   if (typeof window) {
  //     document.addEventListener('scroll', onScroll);
  //   }
  //   return () => {
  //     document.removeEventListener('scroll', onScroll);
  //   };
  // }, []);
  return (
    <>
      <Head>
        <title>글감 - {query.category}</title>
      </Head>
      <main className='main bg-bgColor'>
        <div className='bg-bgColor pt-16'>
          <div className='relative p-6'>
            <HorizontalScroll className='scroll-none mb-6 flex snap-x snap-mandatory gap-2 overflow-x-auto'>
              {Object.entries(WRITING_LIST).map((category, index) => {
                const activeClassName =
                  category[0] === query.category
                    ? 'bg-mint-main text-white'
                    : 'bg-white text-mint-main';
                return (
                  <li
                    key={index}
                    className={`${activeClassName} min-w-max snap-center snap-normal rounded-lg border border-mint-main px-3 py-2 text-sm`}
                  >
                    <Link href={`/writing?category=${category[0]}`}>
                      <a>{category[0]}</a>
                    </Link>
                  </li>
                );
              })}
            </HorizontalScroll>
            <ul className='flex flex-col gap-4'>
              {!writingData && (
                <div className='m-auto'>
                  <Loading />
                </div>
              )}
              {writingData?.flat().length === 0 && <>NO DATA</>}
              {writingData?.flat().length !== 0 &&
                writingData?.flat().map((writingItem) => {
                  writingItem;
                  return (
                    <li
                      key={writingItem.writingId}
                      className='rounded-md bg-white shadow-sm'
                    >
                      <button
                        type='button'
                        onClick={() => onClickBookDescription(writingItem)}
                        className='relative flex h-[1px] min-h-[180px] w-[1px] min-w-full gap-4 rounded-md border p-4'
                      >
                        {writingItem.imageUrl && (
                          <div className='relative h-full w-[87px]'>
                            <Image
                              src={writingItem.imageUrl}
                              alt='book'
                              layout='fill'
                              objectFit='cover'
                              className='rounded-md'
                            />
                          </div>
                        )}
                        <div className='flex flex-1 flex-col gap-2 text-left'>
                          <h1 className='flex'>
                            <BookTitle className='flex-1 text-lg font-bold'>
                              {writingItem.title}
                            </BookTitle>
                            <span className='rounded-md bg-mint-main px-2 py-1 text-sm text-white'>
                              {query.category}
                            </span>
                          </h1>
                          <div className='text-sm text-[#666666]'>
                            {writingItem.author}
                          </div>
                          <EllipsisP className='mt-2 w-full flex-1 text-[#666666] '>
                            {writingItem.description}
                          </EllipsisP>
                        </div>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

Writing.getLayout = function getLayout(page: ReactElement) {
  return (
    <WritingLayout>
      <Header
        leftChild={<h1 className='tab-title'>글감</h1>}
        style={'bg-bgColor'}
      />
      {page}
      <Nav />
    </WritingLayout>
  );
};

const EllipsisP = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  text-indent: 0.5rem;
`;

const BookTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const HorizontalScroll = styled.ul`
  -ms-overflow-style: 'none';
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default Writing;
