import { PropsWithChildren, useState } from 'react';

interface PropsType {
  show: boolean;
  onCloseSidebar: () => void;
}
const Sidebar = ({
  children,
  show,
  onCloseSidebar,
}: PropsWithChildren<PropsType>) => {
  return (
    <>
      <div
        id='opacity-background'
        onClick={onCloseSidebar}
        className={`fixed inset-0 ${
          show && 'z-[100] bg-black opacity-50'
        }  duration-300 ease-in-out`}
      ></div>

      <div
        className={`fixed top-0 right-0 z-[110] flex h-full w-[240px] overflow-scroll bg-white duration-300 ease-in-out ${
          show ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
