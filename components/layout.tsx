import { PropsWithChildren } from 'react';
import useSWR from 'swr';
import fetchData from '../utils/fetchData';

const Layout = ({ children }: PropsWithChildren) => {
  const { data, error } = useSWR('/api/auth', fetchData);

  return <>{children}</>;
};
export default Layout;
