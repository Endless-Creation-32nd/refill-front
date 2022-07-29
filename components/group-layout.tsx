import { PropsWithChildren } from 'react';
import Layout from './layout';

const GroupLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default GroupLayout;
