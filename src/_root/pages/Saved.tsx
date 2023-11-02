import { useEffect } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import Loader from '@/components/shared/Loader';
import GridPostList from '@/components/shared/GridPostList';
import { useInView } from 'react-intersection-observer';
import { useGetSavedPosts } from '@/lib/react-query/queries';

const Saved = () => {
  const { ref, inView } = useInView();
  const { data: savedPosts, fetchNextPage, hasNextPage } = useGetSavedPosts();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!savedPosts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );
  }

  const shouldShowPosts = savedPosts.pages.every(
    (item) => item?.documents.length === 0
  );

  return (
    <div className='saved-container'>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        <PageTitle iconUrl='/assets/icons/save.svg' title='Saved Posts' />
        {savedPosts.pages[0]?.total === 0 ? (
          <p className='text-light-4 mt-10 text-center w-full'>
            You have no saved posts...
          </p>
        ) : shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>No more saved posts...</p>
        ) : (
          savedPosts.pages.map(
            (item, index) =>
              item && (
                <GridPostList
                  key={`page-${index}`}
                  posts={item.documents}
                  isSaved={true}
                />
              )
          )
        )}
      </div>
      {hasNextPage && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Saved;
