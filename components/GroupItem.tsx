import dayjs from 'dayjs';
import styled from '@emotion/styled';
import Link from 'next/link';
import { IGroup } from '../types/IGroup';
import Person from '../assets/group_person.svg';
import Count from '../assets/group_count.svg';
import Period from '../assets/group_period.svg';

interface PropsType {
  group: IGroup;
}
const GroupItem: React.FC<PropsType> = ({ group }) => {
  return (
    <Link href={`/group/${group.groupId}`}>
      <a>
        <li className='rounded-lg border bg-white p-4 shadow-sm'>
          <ul className='flex max-h-[56px] flex-wrap gap-2 overflow-hidden'>
            {group.tagList.map((tag, index) => {
              return (
                <li
                  key={index}
                  className='h-max rounded-[4px] bg-mint-main px-2 py-1 text-xs'
                >
                  # {tag}
                </li>
              );
            })}
          </ul>
          <div className='mt-3'>
            <span className='text-sm font-bold'>{group.name}</span>
            <EllipsisP className='text-xs text-middle-gray'>
              {group.description}
            </EllipsisP>
          </div>
          <ul className='mt-6 flex flex-wrap gap-2 text-xs'>
            <li className='flex items-center gap-1'>
              <Person />
              <span className='text-xs text-middle-gray'>
                {group.participationMembers.length}/{group.maxMember}명
              </span>
            </li>
            <li className='flex items-center gap-1'>
              <Count />
              <span className='text-xs text-middle-gray'>
                주 {group.perWeek}회
              </span>
            </li>
            <li className='flex items-center gap-1'>
              <Period width={20} height={20} />
              <span className='text-xs text-middle-gray'>
                {dayjs(group.startTime).format('YY.MM.DD')}-
                {dayjs(group.endTime).format('YY.MM.DD')}
              </span>
            </li>
          </ul>
        </li>
      </a>
    </Link>
  );
};

const EllipsisP = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export default GroupItem;
