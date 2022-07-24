import BackButton from './BackButton';

const SearchHeader = () => {
  return (
    <header className='common-header bg-white'>
      <BackButton />
      <div className='h-10 flex-1 rounded-lg bg-[#efefef]'> </div>
    </header>
  );
};

export default SearchHeader;
