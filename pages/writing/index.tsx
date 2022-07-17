import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import useSWRInfinite from 'swr/infinite';
import fetchData from '../../utils/fetchData';
import styled from '@emotion/styled';

const WRITING_LIST = ['문학', '시사﹒칼럼', '외국어', '기사', '기타'];

const Writing = () => {
  const router = useRouter();
  const { query } = router;
  const {
    data: writingData,
    mutate,
    setSize,
  } = useSWRInfinite(
    (index) =>
      `/api/writing?category=${query.category}&page=${index + 1}&count=${10}`,
    fetchData
  );

  if (!writingData) {
    return <div>loading...</div>;
  }
  const writingList = writingData.flat();

  const leftChild = <h1 className='text-2xl font-bold'>글감</h1>;

  return (
    <Layout leftChild={leftChild}>
      <div className='relative bg-bgColor p-4'>
        <ul className='flex flex-wrap gap-3 py-6'>
          {WRITING_LIST.map((category, index) => {
            const activeClassName =
              category === query.category
                ? 'bg-mint-main text-white'
                : 'text-mint-main';
            return (
              <li key={index}>
                <Link href={`/writing?category=${category}`}>
                  <a
                    className={`${activeClassName} rounded-lg border-[1px] border-mint-main px-3 py-2 text-sm`}
                  >
                    {category}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className='flex flex-col gap-4'>
          {writingList.map((writingItem) => {
            return (
              <li
                key={writingItem.writingId}
                className='rounded-md bg-white shadow-md'
              >
                <Link href={`/writing/${writingItem.writingId}`}>
                  <a className='relative flex max-h-[180px] w-full gap-2 rounded-md border p-4'>
                    <div className='relative h-[136px] w-[87px]'>
                      <Image
                        src={writingItem.imageUrl}
                        alt='book'
                        layout='fill'
                        objectFit='cover'
                        className='rounded-md'
                      />
                    </div>
                    <div className='flex flex-1 flex-col gap-2'>
                      <h1 className='text-lg font-bold'>{writingItem.title}</h1>
                      <div className='text-sm text-[#666666]'>
                        {writingItem.author}
                      </div>
                      <EllipsisP className='mt-2 w-full flex-1 text-[#666666] '>
                        {writingItem.desicription}
                      </EllipsisP>
                    </div>
                    <div className='absolute top-4 right-4 rounded-md bg-mint-main px-2 py-1 text-sm text-white'>
                      {query.category}
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

const EllipsisP = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export default Writing;
