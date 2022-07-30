import TopButton from '../assets/top_button.svg';

interface PropsType {
  show: boolean;
}
const ToTopButton: React.FC<PropsType> = ({ show }) => {
  const onClickToTop = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  return (
    <button
      onClick={onClickToTop}
      className={`fixed right-10 h-10 w-10 rounded-full border bg-white opacity-90 shadow-lg transition-[bottom] duration-300 
      ${show ? 'bottom-20' : '-bottom-10'}`}
    >
      <TopButton className='m-auto' />
    </button>
  );
};

export default ToTopButton;
