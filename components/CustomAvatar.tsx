import Image from 'next/image';
import Avatar from 'react-avatar';

interface PropsType {
  image: string | null;
  nickname: string;
  width: string;
  height: string;
  size: string;
}
const CustomAvatar: React.FC<PropsType> = ({
  image,
  nickname,
  width,
  height,
  size,
}) => {
  return (
    <div className={`relative ${width} ${height} gap-2 rounded-full`}>
      {image === null ? (
        <Avatar name={nickname} size={size} round={true} />
      ) : (
        <Image
          src={image}
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
