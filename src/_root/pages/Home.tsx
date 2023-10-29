import Loader from '@/components/shared/Loader';
import { useGetRecentPosts } from '@/lib/react-query/queries';
import { Models } from 'appwrite';
import PostCard from '@/components/shared/PostCard';

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isPostsPendingError,
  } = useGetRecentPosts();

  if (isPostsPendingError) return <div>No Posts...</div>;

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2>Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
