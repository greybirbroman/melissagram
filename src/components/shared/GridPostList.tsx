import { Link } from 'react-router-dom';
import { Models } from 'appwrite';
import { useUserContext } from '@/context/AuthContext';
import { POSTS } from '@/constants/routes';
import PostStats from './PostStats';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  isSaved?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
  isSaved = false,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className='grid-container'>
      {posts.map(
        (post) =>
          post && (
            <li key={post.$id} className='relative min-w-80 h-80'>
              <Link
                to={`/${POSTS}/${isSaved ? post.post.$id : post.$id}`}
                className='grid-post_link'
              >
                <img
                  src={isSaved ? post.post.imageUrl : post.imageUrl}
                  alt={`post: ${isSaved ? post.post.$id : post.$id}, Image`}
                  className='h-full w-full object-cover'
                />
              </Link>
              <div className='grid-post_user'>
                {showUser && (
                  <div className='flex flex-1 items-center justify-start gap-2'>
                    <img
                      src={
                        isSaved
                          ? post.post.creator.imageUrl
                          : post.creator.imageUrl
                      }
                      alt='Post Author Avatar, Image'
                      className='h-8 w-8 rounded-full'
                    />
                    <p className='line-clamp-1'>
                      {isSaved ? post.post.creator.name : post.creator.name}
                    </p>
                  </div>
                )}
                {showStats && (
                  <PostStats
                    post={isSaved ? post.post : post}
                    userId={user.id}
                  />
                )}
              </div>
            </li>
          )
      )}
    </ul>
  );
};

export default GridPostList;
