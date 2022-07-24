import dayjs from 'dayjs';
import { ReactElement } from 'react';
import Avatar from 'react-avatar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton';
import GroupLayout from '../../components/group-layout';
import Header from '../../components/header';
import Person from '../../assets/group_person.svg';
import Count from '../../assets/group_count.svg';
import Period from '../../assets/group_period.svg';
import Warning from '../../assets/group_warn.svg';
import useSWR from 'swr';
import fetchData from '../../utils/fetchData';
import { IGroupDetail } from '../../types/IMyGroup';
import axios from 'axios';
import { errorTypes } from '../../utils';

const GroupDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { data: groupDetailData } = useSWR<IGroupDetail>(
    query.groupId && `/api/group/${query.groupId}`,
    fetchData
  );

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
        if (errorType === errorTypes.AUTHORIZATION_FAIL) {
          alert('2개 이상의 그룹에 가입할 수 없습니다.');
        }
      });
  };
  if (!groupDetailData) {
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
  } = groupDetailData;
  return (
    <>
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
            <span className='text-xs text-middle-gray'>{maxMember}명</span>
          </li>
          <li className='flex items-center gap-2'>
            <Count />
            <span className='text-xs text-middle-gray'>주 {perWeek}회</span>
          </li>
          <li className='flex items-center gap-2'>
            <Period />
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
          {participationMembers.map((member) => {
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
                <span className='text-sm font-semibold'>{member.nickname}</span>
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
        className='fixed inset-x-0 bottom-0 flex justify-center bg-black py-4 text-xl font-bold text-mint-main'
      >
        그룹 신청하기
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
      <main className='bg-gray-200'>
        <div className='common-layout bg-bgColor'>{page}</div>
      </main>
    </GroupLayout>
  );
};
export default GroupDetail;
