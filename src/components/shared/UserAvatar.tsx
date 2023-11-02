import { defaultAvatar } from '@/constants';
import { PROFILE } from '@/constants/routes';
import { Link } from 'react-router-dom';

interface IUserAvatar {
  userId?: string;
  imageUrl?: string;
  size?: string;
}

const UserAvatar = ({ userId, imageUrl, size }: IUserAvatar) => {
  return (
    <Link to={`/${PROFILE}/${userId}`}>
      <img
        src={imageUrl || defaultAvatar}
        alt='Post Author, Avatar'
        className={`rounded-full object-cover object-top ${
          size === 'large'
            ? 'w-[150px] h-[150px]'
            : size === 'medium'
            ? 'h-[100px] w-[100px]'
            : 'w-12 h-12'
        }`}
      />
    </Link>
  );
};

export default UserAvatar;
