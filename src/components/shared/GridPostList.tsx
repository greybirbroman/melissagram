import { Link } from 'react-router-dom';
import { Models } from 'appwrite';
import { useUserContext } from '@/context/AuthContext';
import { POSTS } from '@/constants/routes';
import PostStats from './PostStats';


type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean,
  showStats?: boolean,
};

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className='grid-container'>
      {posts.map((post) => (
        <li key={post.$id} className='relative min-w-80 h-80'>
          <Link to={`/${POSTS}/${post.$id}`} className='grid-post_link'>
            <img src={post.imageUrl} alt={`post: ${post.$id}, Image`} className='h-full w-full object-cover'/>
          </Link>
          <div className='grid-post_user'>
            {showUser && (
                <div className='flex flex-1 items-center justify-start gap-2'>
                    <img src={post.creator.imageUrl} alt='Post Author Avatar, Image' className='h-8 w-8 rounded-full'/>
                    <p className='line-clamp-1'>{post.creator.name}</p>
                </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
