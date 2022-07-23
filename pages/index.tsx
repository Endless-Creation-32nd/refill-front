import { ReactElement } from 'react';
import Header from '../components/header';
import HomeLayout from '../components/home-layout';
import Layout from '../components/layout';

const home = () => {
  return <Layout>gdgd</Layout>;
};

home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout>
      <Header />
      <main className='bg-gray-100'>
        <div className='common-layout bg-bgColor'>{page}</div>
      </main>
    </HomeLayout>
  );
};

export default home;
