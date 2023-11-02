import { useGetUsers } from '@/lib/react-query/queries';
import Loader from './Loader';
import UserCard from './UserCard';

const RightSidebar = () => {

  const { data: users, isPending: isUsersPending } = useGetUsers(10);

  if (isUsersPending) return <Loader />;

  return (
    <div className='rightsidebar'>
      <div className='flex flex-col gap-10'>
        <h3 className='h3-bold md:h2-bold w-full'>Top Creators</h3>
        <ul className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
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
