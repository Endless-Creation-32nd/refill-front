import axios from 'axios';
import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import useSWR from 'swr';
import BackButton from '../../components/BackButton';
import GroupLayout from '../../components/group-layout';
import Header from '../../components/header';
import Person from '../../assets/group_person.svg';
import Count from '../../assets/group_count.svg';
import Period from '../../assets/group_period.svg';
import Warning from '../../assets/group_warn.svg';
import fetchData from '../../utils/fetchData';
import { errorTypes } from '../../utils';
import { IGroup } from '../../types/IGroup';
import { IUser } from '../../types/IUser';

const JOIN_BUTTON_STYLE = {
  PARTICIPATE: {
    bgColor: 'bg-mint-main',
    textColor: 'text-black',
  },
  PENDING: {
    bgColor: 'bg-mint-main',
    textColor: 'text-black',
  },
  ABSENCE: {
    bgColor: 'bg-black',
    textColor: 'text-mint-main',
  },
};
const GroupDetail = () => {
  const { data: userData } = useSWR<IUser>('/api/auth', fetchData);
  const router = useRouter();
  const { query } = router;
  const { data: groupData } = useSWR<IGroup>(
    query.groupId && `/api/group/${query.groupId}`,
    fetchData
  );
  const [participationStatus, setParticipationStatus] = useState<
    'PARTICIPATE' | 'PENDING' | 'ABSENCE'
  >('ABSENCE');

  useEffect(() => {
    if (!groupData || !userData) {
      return;
    }
    const { participationMembers } = groupData;
    const member = participationMembers.find(
      (member) => userData.memberId === member.memberId
    );
    if (!member) {
      setParticipationStatus('ABSENCE');
    } else {
      setParticipationStatus(member.status);
    }
  }, [groupData, userData]);

  const onParticipation = () => {
    const accessToken = localStorage.getItem('accessToken');

    axios
      .get(`/api/group/${query.groupId}/participation`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.status === 200) {
          alert('해당 그룹에 가입을 요청하였습니다.');
        }
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.E024) {
          alert('2개 이상의 그룹에 가입할 수 없습니다.');
        } else if (errorType === errorTypes.E025) {
          alert('그룹 인원이 모두 찼습니다.');
        }
      });
  };
  const aa = () => {};

  if (!groupData || !userData) {
    return null;
  }
  const {
    name,
    description,
    penalty,
    maxMember,
    adminId,
    perWeek,
    startTime,
    endTime,
    tagList,
    participationMembers,
  } = groupData;

  return (
    <>
      <Head>
        <title>그룹 - {name}</title>
      </Head>
      <div className='bg-white p-6'>
        <h3 className='mb-4 text-xl font-semibold'>{name}</h3>
        <ul className='mb-2 flex flex-wrap gap-2'>
          {tagList.map((tag, index) => {
            return (
              <li
                key={tag}
                className='rounded-[4px] bg-mint-main px-2 py-1 text-xs'
              >
                # {tag}
              </li>
            );
          })}
        </ul>
        <p className='mb-2 rounded-md border border-light-gray py-4 px-[14px] text-sm'>
          {description}
        </p>
        <ul className='flex flex-wrap gap-2'>
          <li className='flex items-center gap-2'>
            <Person />
            <span className='text-xs text-middle-gray'>
              {
                participationMembers.filter(
                  (member) => member.status === 'PARTICIPATE'
                ).length
              }
              /{maxMember}명
            </span>
          </li>
          <li className='flex items-center gap-2'>
            <Count />
            <span className='text-xs text-middle-gray'>주 {perWeek}회</span>
          </li>
          <li className='flex items-center gap-2'>
            <Period width={20} height={20} />
            <span className='text-xs text-middle-gray'>
              {dayjs(startTime).format('YYYY.MM.DD')} -{' '}
              {dayjs(endTime).format('YYYY.MM.DD')}
            </span>
          </li>
          <li className='flex items-center gap-2'>
            <Warning />
            <span className='text-xs text-middle-gray'>
              {penalty ? '규칙에 따른 패널티가 존재' : '패널티 없음'}
            </span>
          </li>
        </ul>
      </div>
      <div className='p-6'>
        <h3 className='mb-4 text-xl font-semibold'>함께 하고 있는 멤버</h3>
        <ul className='grid grid-cols-3 gap-3'>
          {participationMembers
            .filter((member) => member.status === 'PARTICIPATE')
            .map((member) => {
              return (
                <li
                  key={member.memberId}
                  className='flex flex-col items-center gap-2 rounded-lg border border-light-gray py-4 px-[14px] shadow-lg'
                >
                  <div className='relative h-[61px] w-[61px]'>
                    {member.memberId === adminId && (
                      <div className='absolute -top-2 right-1/2 z-[1] translate-x-1/2 rounded-full bg-black py-[2px] px-2 text-[8px] text-mint-main'>
                        방장
                      </div>
                    )}
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt='프로필'
                        objectFit='cover'
                        layout='fill'
                        className='rounded-full'
                      />
                    ) : (
                      <Avatar name={member.nickname} size='61' round={true} />
                    )}
                  </div>
                  <span className='text-sm font-semibold'>
                    {member.nickname}
                  </span>
                  <button className='rounded-[4px] bg-mint-main px-4 py-1 text-xs'>
                    필사기록
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <button
        type='button'
        onClick={onParticipation}
        disabled={participationStatus !== 'ABSENCE'}
        className={`fixed inset-x-0 bottom-0  py-4 text-xl font-bold
        ${JOIN_BUTTON_STYLE[participationStatus].bgColor}
        ${JOIN_BUTTON_STYLE[participationStatus].textColor}`}
      >
        {participationStatus === 'ABSENCE' && '그룹 신청하기'}
        {participationStatus === 'PARTICIPATE' && '이미 참여중인 그룹입니다!'}
        {participationStatus === 'PENDING' && '가입 대기중인 그룹입니다!'}
      </button>
    </>
  );
};

GroupDetail.getLayout = function getLayout(page: ReactElement) {
  const middleChild = <h1 className='tab-middle-title'>그룹</h1>;

  return (
    <GroupLayout>
      <Header
        leftChild={<BackButton />}
        middleChild={middleChild}
        style={'bg-white'}
      />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>{page}</div>
      </main>
    </GroupLayout>
  );
};
export default GroupDetail;
