import { useEffect } from 'react';
import { useGetInfiniteUsers } from '@/lib/react-query/queries';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/shared/Loader';
import { toast } from '@/components/ui/use-toast';
import AllUsersList from '@/components/shared/AllUsersList';

const AllUsers = () => {
  const { ref, inView } = useInView();
  const {
    data: users,
    isPending: isUsersPending,
    isError: isUserFetchingError,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteUsers();

  console.log(users);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isUsersPending && !users) return <Loader />;
  if (isUserFetchingError) return toast({ title: 'Users Fetching Error...' });

  return (
    <div className='user-container'>
      <div className='flex items-center gap-2.5'>
        <img
          src='/assets/icons/people.svg'
          className='invert-white'
          width={36}
          height={36}
        />
        <h2 className='h3-bold md:h2-bold w-full'>All Users</h2>
      </div>
      {users.pages.map(
        (user, index) =>
          user && <AllUsersList key={`page-${index}`} users={user.documents} />
      )}
      {hasNextPage && (
        <div ref={ref} className='w-full'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
