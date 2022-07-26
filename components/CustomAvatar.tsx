import Image from 'next/image';
import Avatar from 'react-avatar';
import { IMember } from '../types/IGroup';

interface PropsType {
  member: IMember;
  width: string;
  height: string;
  size: string;
}
const CustomAvatar: React.FC<PropsType> = ({ member, width, height, size }) => {
  return (
    <div className={`relative ${width} ${height} gap-2 rounded-full`}>
      {member.image === null ? (
        <Avatar name={member.nickname} size={size} round={true} />
      ) : (
        <Image
          src={member.image}
          alt='member'
          objectFit='cover'
          layout='fill'
          className='rounded-full'
        />
      )}
    </div>
  );
};

export default CustomAvatar;
