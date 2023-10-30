import { defaultAvatar } from '@/constants';
import { PROFILE } from '@/constants/routes';
import { Link } from 'react-router-dom';

interface IUserAvatar {
  userId: string;
  imageUrl: string;
}

const UserAvatar = ({ userId, imageUrl }: IUserAvatar) => {
  return (
    <Link to={`/${PROFILE}/${userId}`}>
      <img
        src={imageUrl || defaultAvatar}
        alt='Post Author, Avatar'
        className={`rounded-full w-12 lg:h-12`}
      />
    </Link>
  );
};

export default UserAvatar;
