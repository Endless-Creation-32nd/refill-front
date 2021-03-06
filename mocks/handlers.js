import { rest } from 'msw';

export const handlers = [
  rest.get('/api/writing', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '조회 성공',
        data: [
          {
            writingId: 123123,
            title: '벼리서당 수상한 책벌레들',
            imageUrl:
              'http://www.kpipa.or.kr/upload/book/KP0062/1384146725763_4162.jpg',
            author: '이병승 글, 우혜민 그림',
            desicription:
              '얼마 전 한 방송국에서 “독서왕”프로그램을 만들려고 했다. 어린이들에게 경쟁을 통해 독서의 동기를 부여하겠다는 취지였다. 하지만 경쟁적 수박 겉핥기식 독서에 대한 우려로 취소되었다. 이 일은 참독서에 대해 다시 한 번 생각해 보는 기회를 갖게 해줬다. 이 책의 배경인 옛날 시골 서당에서도 독서왕 대회가 열린다. 저자는 대회를 준비하는 세 학동들, 학문을 특권으로 아는 엄도령, 학문을 출세의 수단으로 여기는 평민 나한길, 가난하고 여자이지만 학문 자체를 즐기는 책벌레 강의를 통해 진정한 책읽기에 대해 말하고 있다. 어느 날 평민의 딸 강의가 서당에 들어오자 과거도 못 보는 여자와 공부한다는 것이 못마땅한 양반 엄도령은 독서왕 대회를 훈장님께 건의한다. 엄도령은 당연히 일등은 자기이고 꼴등은 강의가 될 거라고 확신했다. 그래서 일등에게는 과거 합격률이 높은 향교로 보내주는 상을, 꼴등에게는 서당에서 쫓아내는 벌을 주자고 잔꾀를 부린다. 훈장님은 흔쾌히 허락하고, 3개월의 준비기간을 준다. 엄도령은 온갖 수단을 통해 독서록 100권을 채우는 반면, 비겁하게도 책을 빌려달라는 강의에게 아주 어려운 책 한 권만 건네준다. 강의는 비록 어려운 책이지만 밤낮으로 읽고 또 마음으로 느끼며 읽어간다. 요즘 초등학교에도 엄도령 같은 어린이들이 많다. 또한 무조건 독서록을 많이 쓰는 어린이들에게 독서우수상을 주는 학교도 많다. 물론 책을 많이 읽는 것이 좋다. 하지만 그보다 더 좋은 것은 정약용 선생의 가르침처럼 개개인의 능력에 맞춰 깊이 읽고 실천하는 것이다. 어린이들은 이 책을 읽으면서 엄도령과 강의의 독서태도를 자연스럽게 비교해 볼 것이다. 더불어 참독서란 기계처럼 책을 읽고, 독서록을 많이 쓰는 것이 아니라 마음으로 읽는 것이라는 점도 깨닫게 될 것 같다. 내 독서스타일도 반성할 수 있는 것은 덤이다.',
            linkUrl:
              'http://www.kpipa.or.kr/info/recommBookInfo.do?board_id=35&article_id=4162&book_info_id=10',
          },
          {
            writingId: 234234,
            title: '괴물이 된 그림',
            imageUrl:
              'http://www.kpipa.or.kr/upload/book/KP0062/1384146725654_4162.jpg',
            author: '이연식',
            desicription:
              '‘괴물’을 뜻하는 영어 ‘monster’의 어원은 ‘monstere’라는 동사인데, ‘보여주다’라는 뜻을 품고 있다. 보여주고 싶은 자기과시의 욕구가 과해지면 누구든 괴물로 변하고 마는 것일까. 그도 그럴 법 하다. 따져보면 여러 신화 속에 등장하는 수많은 괴물들은 나름대로 공통된 특징이 있는데, 그건 한때 빼어난 미모를 가지고 있었지만 지나치게 자만하거나 오만하여 만인이 혐오하는 괴물로 바뀌는 저주를 받았다는 점이다. 괴물은 늘 영웅에게 자기 존재를 드러내며 인정받고 싶어 한다. 그러나 가엾게도 그 보여주는 방식에 있어 괴물은 스스로도 납득할 수 없을 만큼 비타협적이고 폭력적이다. 이렇듯 괴물은 인간인 우리가 인간성을 갖춘 인간이기 위해 경계해야 할 끔찍스런 상태를 가리킨다. 즉 진정한 인간이 되려면 돌이킬 수 없는 추악한 나락으로 추락해서는 안 되는데, 그 추악한 상태가 바로 괴물이라고 저자는 말한다. 이 책에는 마법에 걸린 주인공들이 많이 나온다. ‘잠자는 숲 속의 공주’ 이야기처럼 어떤 악의 존재에 속박된 여인, 그 속박을 풀고 그녀를 진정으로 구원해줄 영웅, 그리고 그 사이에는 언제나 처단되어야 할 흉측한 괴물이 있다. 공주는 순수하고 아름다운 인간성을 대표하며, 삶이라는 모험 속에 용감하게 뛰어든 인간이라면 누구나 영웅이라고 말할 수 있다. 그리고 그 영웅이 어쩔 수 없이 만나게 되고, 반드시 넘어서야 할 인간의 혐오스러운 본성이 바로 괴물이다. 괴물은 우리의 마음속에 하나의 원형을 이루면서 현대에까지 이르고 있다. 그것은 관능이나 유혹, 속도, 두려움, 흐릿하거나 반투명한 형상들, 시공의 경계를 넘나드는 존재 등 다양한 모습으로 곳곳에서 숨을 쉬고 있다. 아직도 우리들에게 끊임없이 무언가를 보여주려고 애쓰면서 말이다.',
            linkUrl:
              'http://www.kpipa.or.kr/info/recommBookInfo.do?board_id=35&article_id=4162&book_info_id=2',
          },
        ],
      })
    );
  }),
  rest.get('/api/group/recommendation', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '추천 그룹 조회 성공',
        data: [
          {
            groupId: 1,
            groupName: '그룹이름',
            description:
              '그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명',
            tagList: ['태그', '태그'],
            maxMember: 4,
            currentMember: 2,
            postCount: 3, // 인증 글 최소 갯수
            startTime: '2022-7-10',
            endTime: '2022-7-15',
          },
          {
            groupId: 2,
            groupName: '그룹이름',
            description:
              '그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명',
            tagList: ['태그', '태그'],
            maxMember: 4,
            currentMember: 2,
            postCount: 3, // 인증 글 최소 갯수
            startTime: '2022-7-10',
            endTime: '2022-7-15',
          },
          {
            groupId: 3,
            groupName: '그룹이름',
            description:
              '그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명 그룹 설명',
            tagList: ['태그', '태그'],
            maxMember: 4,
            currentMember: 2,
            postCount: 3, // 인증 글 최소 갯수
            startTime: '2022-7-10',
            endTime: '2022-7-15',
          },
        ],
      })
    );
  }),
];
