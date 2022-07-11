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
    <header className='sticky top-0 left-0 z-[99] flex h-16 w-full items-center justify-between bg-white px-4'>
      <div id='left-child' className='flex flex-1 justify-start'>
        {leftChild || <></>}
      </div>
      <div id='middle-child'>{middleChild || <></>}</div>
      <div id='right-child' className='flex flex-1 justify-end'>
        {rightChild || <></>}
      </div>
    </header>
  );
};
export default Header;
