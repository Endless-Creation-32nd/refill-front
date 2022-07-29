import React, { FC, MouseEvent, useCallback } from 'react';

interface PropsType {
  show: boolean;
  children?: React.ReactNode;
  onCloseModal: () => void;
  className?: string;
}
const Modal: FC<PropsType> = ({
  show,
  children,
  onCloseModal,
  className = '',
}) => {
  const stopPropagation = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);
  if (!show) {
    return null;
  }
  return (
    <>
      <div
        onClick={onCloseModal}
        className='fixed inset-0 z-[1000] bg-black text-center opacity-50'
      ></div>
      <div
        onClick={stopPropagation}
        className='fixed bottom-1/2 right-1/2 z-[1010] translate-x-1/2 translate-y-1/2'
      >
        <button
          onClick={onCloseModal}
          className='text-md absolute top-1 right-2 cursor-pointer bg-white'
        >
          &times;
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
