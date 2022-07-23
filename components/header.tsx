import { ReactNode } from 'react';

interface PropsType {
  leftChild?: ReactNode | JSX.Element;
  middleChild?: ReactNode | JSX.Element;
  rightChild?: ReactNode | JSX.Element;
  style?: string;
}
const Header: React.FC<PropsType> = ({
  leftChild,
  middleChild,
  rightChild,
  style,
}) => {
  return (
    <header className={`common-header ${style}`}>
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
