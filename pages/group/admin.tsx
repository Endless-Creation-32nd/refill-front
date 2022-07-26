import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Person from '../../assets/search_person.svg';

const GroupAdmin = () => {
  const leftChild = (
    <button className='z-50 flex cursor-pointer items-center'>
      <span className='pt-1 text-xl font-thin'>7</span>
      <Person width='24' height='24' fill='#000000' />
    </button>
  );

  return (
    <>
      <Header
        leftChild={<BackButton />}
        middleChild={<h3 className='tab-middle-title'>그룹 멤버 관리</h3>}
        rightChild={leftChild}
        style={'bg-white'}
      />
      <main className='main bg-bgColor'>
        <div className='bg-bgColor pt-16'>
          <div className='bg-white p-6'>
            <span>가입신청</span>
            <ul>{}</ul>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};
export default GroupAdmin;
