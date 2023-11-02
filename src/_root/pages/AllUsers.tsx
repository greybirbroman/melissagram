import { useEffect } from 'react';
import { useGetInfiniteUsers } from '@/lib/react-query/queries';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/shared/Loader';
import PageTitle from '@/components/shared/PageTitle';
import AllUsersList from '@/components/shared/AllUsersList';

const AllUsers = () => {
  const { ref, inView } = useInView();
  const {
    data: users,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteUsers();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isPending && !users) return <Loader />;

  return (
    <div className='user-container'>
      <PageTitle iconUrl='/assets/icons/people.svg' title='All Users' />
      {users?.pages.map(
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
