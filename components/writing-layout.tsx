import { PropsWithChildren } from 'react';
import Layout from './layout';

const WritingLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default WritingLayout;
