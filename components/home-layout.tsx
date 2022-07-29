import { PropsWithChildren } from 'react';
import Layout from './layout';
import Nav from './nav';

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      {children}
      <Nav />
    </Layout>
  );
};

export default HomeLayout;
