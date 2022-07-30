import useSWR from 'swr';
import { useRouter } from 'next/router';

import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import CustomAvatar from '../../components/CustomAvatar';

import fetchData from '../../utils/fetchData';
import { errorTypes } from '../../utils';
import { AuthenticationError } from '../../utils/error';
import { axiosPrivate } from '../../utils/axiosPrivate';

import { IGroup } from '../../types/IGroup';
import { IMember } from '../../types/IMember';

import Person from '../../assets/search_person.svg';
import Head from 'next/head';

interface DetailMember extends IMember {
  lastWeekRemainActivity: number;
}

interface MemberTypes {
  pendingMembers: IMember[];
  participateMembers: DetailMember[];
}

const GroupAdmin = () => {
  const { data: myGroupData } = useSWR<IGroup>('/api/group', fetchData);

  const router = useRouter();
  const { query } = router;
  const {
    data: memberData,
    mutate: mutateMemberData,
    error,
  } = useSWR<MemberTypes>(
    query.groupId ? `/api/group/admin/${query.groupId}/members` : null,
    fetchData
  );

  if (error) {
    if (error instanceof AuthenticationError) {
      alert(error.message);
      router.back();
    }
  }

  const handleApproveMember = (member: IMember) => {
    if (!confirm(`정말로 ${member.nickname} 님의 가입을 승인하겠습니까?`)) {
      return;
    }
    axiosPrivate
      .get(`/api/group/admin/${query.groupId}/participation/${member.memberId}`)
      .then((response) => {
        if (response.status === 200) {
          alert(`${member.nickname} 님의 가입이 승인되었습니다.`);
          mutateMemberData();
        }
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (error instanceof AuthenticationError) {
          router.back();
          alert(error.message);
        } else if (errorType === errorTypes.E024) {
          alert('이미 다른 그룹에 가입한 사용자 입니다.');
          mutateMemberData();
        } else if (errorType === errorTypes.E025) {
          alert('그룹 제한 인원을 초과하였습니다.');
        }
      });
  };

  const handleRefuceMember = (member: IMember) => {
    if (!confirm(`정말로 ${member.nickname} 님을 거절하겠습니까?`)) {
      return;
    }
    axiosPrivate
      .delete(
        `/api/group/admin/${query.groupId}/participation/${member.memberId}`
      )
      .then((response) => {
        if (response.status === 200) {
          alert(`${member.nickname} 님의 가입이 거절되었습니다.`);
          mutateMemberData();
        }
      })
      .catch((error) => {
        if (error instanceof AuthenticationError) {
          router.back();
          alert(error.message);
        }
      });
  };

  const handleKickout = (member: IMember) => {
    if (myGroupData?.adminId === member.memberId) {
      alert('그룹장을 퇴출할 수 없습니다.');
      return;
    }
    if (
      !confirm(
        `정말로 ${member.nickname} 님을 퇴출하겠습니까?(되돌릴 수 없습니다.)`
      )
    ) {
      return;
    }
    axiosPrivate
      .delete(`/api/group/admin/${query.groupId}/member/${member.memberId}`)
      .then((response) => {
        if (response.status === 200) {
          alert(`${member.nickname} 님을 퇴출하였습니다.`);
          mutateMemberData();
        }
      })
      .catch((error) => {
        if (error instanceof AuthenticationError) {
          router.back();
          alert(error.message);
        }
      });
  };

  const givePenalty = (member: DetailMember) => {
    if (!myGroupData?.penalty) {
      alert('패널티 제도가 없는 그룹입니다.');
      return;
    }
    if (member.lastWeekRemainActivity === 0) {
      alert('지난 주에 모든 필사 인증을 하여 패널티를 부여할 수 없습니다.');
      return;
    }
    if (myGroupData?.adminId === member.memberId) {
      alert('그룹장에게 패널티를 줄 수 없습니다.');
      return;
    }
    axiosPrivate
      .post(`/api/group/admin/${query.groupId}/penalty/${member.memberId}`)
      .then((response) => {
        alert(`${member.nickname}님에게 패널티가 부여되었습니다.`);
        mutateMemberData();
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (error instanceof AuthenticationError) {
          router.back();
          alert('패널티를 줄 권한이 없습니다.');
        } else if (errorType === errorTypes.E028) {
          alert('패널티 제도가 없는 그룹입니다.');
        } else if (errorType === errorTypes.E029) {
          alert('그룹당 한 유저에게 최대 3회의 패널티를 부여할 수 있습니다.');
        } else if (errorType === errorTypes.E030) {
          alert(
            '지난 주에 모든 필사인증을 완수하여 패널티를 부여할 수 없습니다.'
          );
        }
      });
  };

  const cancelPenalty = (member: DetailMember) => {
    if (!myGroupData?.penalty) {
      alert('패널티 제도가 없는 그룹입니다.');
      return;
    }
    if (member.penaltyCount === 0) {
      alert('패널티가 없습니다.');
      return;
    }

    axiosPrivate
      .delete(`/api/group/admin/${query.groupId}/penalty/${member.memberId}`)
      .then((response) => {
        alert(`${member.nickname}님의 패널티를 취소하였습니다.`);
        mutateMemberData();
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (error instanceof AuthenticationError) {
          router.back();
          alert('패널티를 줄 권한이 없습니다.');
        } else if (errorType === errorTypes.E029) {
          alert('해당 유저는 패널티가 없습니다.');
        }
      });
  };
  const leftChild = (
    <button className='z-50 flex cursor-pointer items-center'>
      <span className='text-xl font-light'>
        {memberData?.participateMembers.length}
      </span>
      <Person width='24' height='24' fill='#000000' />
    </button>
  );

  return (
    <>
      <Head>
        <title>그룹 멤버 관리</title>
      </Head>
      <Header
        leftChild={<BackButton />}
        middleChild={<h3 className='tab-middle-title'>그룹 멤버 관리</h3>}
        rightChild={leftChild}
        style={'bg-white'}
      />
      <main className='main bg-bgColor'>
        <div className='bg-bgColor pt-16'>
          <div className='flex flex-col gap-4 bg-white p-6'>
            <span className='text-sm text-[#666666]'>가입신청</span>
            <ul className='flex flex-col'>
              {memberData?.pendingMembers.length === 0 ? (
                <>
                  <p className='text-sm text-black'>
                    그룹에 새로 가입한 멤버가 없습니다.
                  </p>
                </>
              ) : (
                <>
                  {memberData?.pendingMembers.map((member) => {
                    return (
                      <li
                        key={member.memberId}
                        className='flex items-center gap-4 py-1'
                      >
                        <CustomAvatar
                          image={member.image}
                          nickname={member.nickname}
                          width={'w-8'}
                          height={'h-8'}
                          size={'32'}
                        />
                        <div className='flex-1'>{member.nickname}</div>
                        <button
                          onClick={() => handleApproveMember(member)}
                          className='flex-1 rounded-[4px] border border-mint-main py-1 text-xs text-mint-main shadow-md hover:bg-mint-main hover:text-white'
                        >
                          가입 승인
                        </button>
                        <button
                          onClick={() => handleRefuceMember(member)}
                          className='flex-1 rounded-[4px] border border-warning py-1 text-xs text-warning shadow-md hover:bg-warning hover:text-white'
                        >
                          거절
                        </button>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
          <div className='mx-6 h-[1px] border border-light-gray'></div>
          <div className='flex flex-col gap-4 p-6'>
            <span className='text-sm text-[#666666]'>그룹멤버</span>
            <ul className='flex flex-col gap-3'>
              {memberData?.participateMembers.length === 0 ? (
                <>
                  <p className='text-sm text-black'>그룹 멤버가 없습니다.</p>
                </>
              ) : (
                <>
                  {memberData?.participateMembers.map((member) => {
                    return (
                      <li
                        key={member.memberId}
                        className='flex items-center gap-4 rounded-lg border bg-white p-3 shadow-sm'
                      >
                        <CustomAvatar
                          image={member.image}
                          nickname={member.nickname}
                          width={'w-[45px]'}
                          height={'h-[45px]'}
                          size={'45'}
                        />
                        <div className='flex flex-1 flex-col gap-2'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm'>{member.nickname}</span>
                            <span className='text-xs text-warning'>
                              {member.penaltyCount !== 0 &&
                                `패널티 누적 ${member.penaltyCount}회`}
                            </span>
                          </div>
                          <p className='text-xs text-[#494949]'>
                            지난주 미진행 필사 횟수{' '}
                            {member.lastWeekRemainActivity}회
                          </p>
                          <div className='flex gap-2'>
                            <button
                              onClick={() => givePenalty(member)}
                              disabled={
                                !myGroupData?.penalty ||
                                member.lastWeekRemainActivity === 0
                              }
                              className={`flex-1 rounded-[4px] py-1 text-xs shadow-md
                              ${
                                !myGroupData?.penalty ||
                                member.lastWeekRemainActivity === 0
                                  ? 'cursor-not-allowed bg-light-gray text-white'
                                  : 'bg-mint-main text-white'
                              }`}
                            >
                              패널티
                            </button>
                            <button
                              onClick={() => cancelPenalty(member)}
                              disabled={
                                !myGroupData?.penalty ||
                                member.penaltyCount === 0
                              }
                              className={`flex-1 rounded-[4px] bg-light-gray py-1
                               text-xs text-white shadow-md
                               ${
                                 !myGroupData?.penalty ||
                                 member.penaltyCount === 0
                                   ? 'cursor-not-allowed'
                                   : ''
                               }`}
                            >
                              패널티 취소
                            </button>
                            <button
                              onClick={() => handleKickout(member)}
                              className='flex-1 rounded-[4px] bg-black py-1 text-xs text-mint-main shadow-md'
                            >
                              퇴출
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};
export default GroupAdmin;
