import { Button } from '../ui/button';
import { Models } from 'appwrite';
import UserAvatar from './UserAvatar';

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className='min-w-[190px] min-h-[190px] rounded-2xl border-2 bg-dark-3 border-dark-4 flex flex-col items-center justify-between gap-3 py-10'>
     <UserAvatar userId={user.$id} imageUrl={user.imageUrl}/>
      <p className='base-medium lg:body-bold text-light-1'>{user.name}</p>
      <p className='small-regular text-light-3'>@{user.username}</p>
      <Button className='bg-primary-500 w-1/2'>Follow</Button>
    </div>
  );
};

export default UserCard;
