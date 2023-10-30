import { useGetUsers } from '@/lib/react-query/queries';
import Loader from './Loader';
import UserCard from './UserCard';

const RightSidebar = () => {
  const { data: users, isPending: isUsersPending } = useGetUsers();

  if (isUsersPending) return <Loader />;

  return (
    <div className='rightsidebar'>
      <div className='flex flex-col gap-10'>
        <h3 className='h3-bold md:h2-bold w-full'>Top Creators</h3>
        <ul className='flex flex-wrap gap-6'>
          {users?.documents.map((user) => (
            <li key={user.$id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
