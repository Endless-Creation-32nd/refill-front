import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import useSWRInfinite from 'swr/infinite';
import fetchWriting from '../../utils/fetchWritings';

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
    fetchWriting
  );

  if (!writingData) {
    return <div>loading...</div>;
  }
  const writingList = writingData.flat();
  return (
    <Layout>
      <div>
        <ul className='my-6 flex gap-2'>
          {WRITING_LIST.map((category, index) => {
            const activeClassName =
              category === query.category
                ? 'bg-mint-main text-white'
                : 'text-mint-main';
            return (
              <li key={index}>
                <Link href={`/writing?category=${category}`}>
                  <a
                    className={`${activeClassName} rounded-md border-[1px] border-mint-main px-4 py-1`}
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
              <li key={writingItem.writingId}>
                <Link href={`/writing/${writingItem.writingId}`}>
                  <a className='relative flex max-h-[168px] gap-2 rounded-lg border-[1px] p-4'>
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
                      <p className='mt-2 flex-1 overflow-hidden text-ellipsis text-[#666666]'>
                        {writingItem.desicription}
                      </p>
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

export default Writing;
