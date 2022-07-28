import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Person from '../../assets/search_person.svg';
import { useRouter } from 'next/router';
import fetchData from '../../utils/fetchData';
import useSWR from 'swr';
import { IMemberType } from '../../types/IMemberType';
import CustomAvatar from '../../components/CustomAvatar';
import { IMember } from '../../types/IMember';
import { AuthenticationError } from '../../utils/error';
import { axiosPrivate } from '../../utils/axiosPrivate';

const member: IMember = {
  memberId: 4,
  nickname: '오정진',
  image: null,
  status: 'PARTICIPATE',
};

const GroupAdmin = () => {
  const router = useRouter();
  const { query } = router;
  const {
    data: memberData,
    mutate: mutateMemberData,
    error,
  } = useSWR<IMemberType>(
    query.groupId ? `/api/group/admin/${query.groupId}/members` : null,
    fetchData
  );
  if (error) {
    if (error instanceof AuthenticationError) {
      router.back();
      alert(error.message);
    }
  }
  const leftChild = (
    <button className='z-50 flex cursor-pointer items-center'>
      <span className='pt-1 text-xl font-thin'>
        {memberData?.participateMembers.length}
      </span>
      <Person width='24' height='24' fill='#000000' />
    </button>
  );

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
        if (error instanceof AuthenticationError) {
          router.back();
          alert(error.message);
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
                          member={member}
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
                  <p className='text-sm text-black'>
                    그룹에 새로 가입한 멤버가 없습니다.
                  </p>
                </>
              ) : (
                <>
                  {memberData?.participateMembers.map((member) => {
                    return (
                      <li
                        key={member.memberId}
                        className='flex items-center gap-4 rounded-lg border p-3 shadow-sm'
                      >
                        <CustomAvatar
                          member={member}
                          width={'w-[45px]'}
                          height={'h-[45px]'}
                          size={'45'}
                        />
                        <div className='flex flex-1 flex-col gap-2'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm'>{member.nickname}</span>
                            <span className='text-xs text-warning'>
                              패널티 누적 1회
                            </span>
                          </div>
                          <p className='text-xs text-[#494949]'>
                            지난주 미진행 필사 횟수 0회
                          </p>
                          <div className='flex gap-2'>
                            <button className='flex-1 rounded-[4px] bg-mint-main py-1 text-xs text-white shadow-md'>
                              패널티
                            </button>
                            <button className='flex-1 rounded-[4px] bg-light-gray py-1 text-xs text-white shadow-md'>
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
