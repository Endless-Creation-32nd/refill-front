import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import fetchData from './fetchData';

interface Return<T> {
  data: T[];
  error: any;
  size: number;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<T[][] | undefined>;
  isEmpty: boolean;
  isLoadingInitialData: boolean;
  isLoadingMore: boolean | undefined;
  isReachingEnd: boolean | undefined;
}

const PAGE_SIZE = 10;

export function useInfiniteScroll<T>(getKey: SWRInfiniteKeyLoader): Return<T> {
  const { data, error, size, setSize } = useSWRInfinite<T[]>(getKey, fetchData);

  const list = data ? ([] as T[]).concat(...data) : [];
  const isEmpty = data?.[0]?.length === 0;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === 'undefined';
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return {
    data: list,
    error,
    size,
    setSize,
    isEmpty,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
  };
}
