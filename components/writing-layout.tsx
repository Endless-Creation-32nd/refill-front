import { PropsWithChildren, useState } from 'react';
import { WritingContext } from '../libs/WritingContext';
import { IWriting } from '../types/IWriting';
import Layout from './layout';

const WritingLayout = ({ children }: PropsWithChildren) => {
  const initialState = {
    writingId: '',
    title: '',
    imageUrl: '',
    author: '',
    description: '',
    linkUrl: '',
  };
  const [writing, setWriting] = useState<IWriting>(initialState);

  return (
    <WritingContext.Provider value={{ writing, setWriting }}>
      <Layout>{children}</Layout>
    </WritingContext.Provider>
  );
};

export default WritingLayout;
