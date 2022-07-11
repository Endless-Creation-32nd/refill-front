import Image from 'next/image';
import { useRouter } from 'next/router';

const imageUrl =
  'http://www.kpipa.or.kr/upload/book/KP0062/1384146725763_4162.jpg';
const title = '녹색갈증';
const desicription =
  '얼마 전 한 방송국에서 “독서왕”프로그램을 만들려고 했다. 어린이들에게 경쟁을 통해 독서의 동기를 부여하겠다는 취지였다. 하지만 경쟁적 수박 겉핥기식 독서에 대한 우려로 취소되었다. 이 일은 참독서에 대해 다시 한 번 생각해 보는 기회를 갖게 해줬다. 이 책의 배경인 옛날 시골 서당에서도 독서왕 대회가 열린다. 저자는 대회를 준비하는 세 학동들, 학문을 특권으로 아는 엄도령, 학문을 출세의 수단으로 여기는 평민 나한길, 가난하고 여자이지만 학문 자체를 즐기는 책벌레 강의를 통해 진정한 책읽기에 대해 말하고 있다. 어느 날 평민의 딸 강의가 서당에 들어오자 과거도 못 보는 여자와 공부한다는 것이 못마땅한 양반 엄도령은 독서왕 대회를 훈장님께 건의한다. 엄도령은 당연히 일등은 자기이고 꼴등은 강의가 될 거라고 확신했다. 그래서 일등에게는 과거 합격률이 높은 향교로 보내주는 상을, 꼴등에게는 서당에서 쫓아내는 벌을 주자고 잔꾀를 부린다. 훈장님은 흔쾌히 허락하고, 3개월의 준비기간을 준다. 엄도령은 온갖 수단을 통해 독서록 100권을 채우는 반면, 비겁하게도 책을 빌려달라는 강의에게 아주 어려운 책 한 권만 건네준다. 강의는 비록 어려운 책이지만 밤낮으로 읽고 또 마음으로 느끼며 읽어간다. 요즘 초등학교에도 엄도령 같은 어린이들이 많다. 또한 무조건 독서록을 많이 쓰는 어린이들에게 독서우수상을 주는 학교도 많다. 물론 책을 많이 읽는 것이 좋다. 하지만 그보다 더 좋은 것은 정약용 선생의 가르침처럼 개개인의 능력에 맞춰 깊이 읽고 실천하는 것이다. 어린이들은 이 책을 읽으면서 엄도령과 강의의 독서태도를 자연스럽게 비교해 볼 것이다. 더불어 참독서란 기계처럼 책을 읽고, 독서록을 많이 쓰는 것이 아니라 마음으로 읽는 것이라는 점도 깨닫게 될 것 같다. 내 독서스타일도 반성할 수 있는 것은 덤이다.';
const linkUrl =
  'http://www.kpipa.or.kr/info/recommBookInfo.do?board_id=35&article_id=4162&book_info_id=10';

const Detail = () => {
  const router = useRouter();

  return (
    <>
      <header className='sticky inset-x-0 top-0 z-[99] h-10 bg-white px-4'>
        <button onClick={() => router.back()}>&lt;</button>
      </header>
      <div className='flex flex-col p-4'>
        <div className='relative h-[246px] w-[158px] self-center'>
          <Image
            src={imageUrl}
            alt='book'
            layout='fill'
            objectFit='cover'
            className='rounded-md'
          />
        </div>
        <h1 className='mt-2 text-2xl font-bold'>{title}</h1>
        <p className='mt-4 indent-2 text-[#666666]'>{desicription}</p>
      </div>
      <a
        href={linkUrl}
        className='sticky inset-x-0 bottom-0 flex justify-center bg-black py-4 text-2xl text-mint-main'
      >
        상세정보 보기
      </a>
    </>
  );
};

export default Detail;
