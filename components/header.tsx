import { ReactNode } from 'react';

interface PropsType {
  leftChild?: ReactNode;
  middleChild?: ReactNode;
  rightChild?: ReactNode;
}
const Header: React.FC<PropsType> = ({
  leftChild,
  middleChild,
  rightChild,
}) => {
  return (
    <header className='sticky top-0 left-0 z-[99] flex h-16 w-full items-center justify-between border-b-[1px] border-t-gray-400 bg-white px-4 drop-shadow-sm'>
      {leftChild || <div id='left-child'></div>}
      {middleChild || <div id='middle-child'></div>}
      {rightChild || <div id='right-child'></div>}
    </header>
  );
};
export default Header;
