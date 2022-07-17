import dayjs from 'dayjs';
import Link from 'next/link';
import { IGroup } from '../types/IGroup';

interface Props {
  group: IGroup;
}
const GroupItem: React.FC<Props> = ({ group }) => {
  return (
    <Link href={`/group/${group.groupId}`}>
      <a>
        <li className='rounded-lg border bg-white p-4 shadow-md'>
          <ul className='flex gap-2'>
            {group.tagList.map((tag, index) => {
              return (
                <li
                  key={index}
                  className='rounded-[4px] bg-mint-main px-2 py-1 text-xs'
                >
                  # {tag}
                </li>
              );
            })}
          </ul>
          <div className='mt-3'>
            <span className='text-sm font-bold'>{group.groupName}</span>
            <p className='text-xs'>{group.description}</p>
          </div>
          <ul className='mt-6 flex flex-wrap gap-2 text-xs'>
            <li>
              {group.currentMember} / {group.maxMember}
            </li>
            <li>주 {group.postCount}회</li>
            <li className='flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>{' '}
              {dayjs(group.startTime).format('YYYY.MM.DD')} -{' '}
              {dayjs(group.endTime).format('YYYY.MM.DD')}
            </li>
          </ul>
        </li>
      </a>
    </Link>
  );
};

export default GroupItem;
