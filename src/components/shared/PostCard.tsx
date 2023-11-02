import { Link } from 'react-router-dom';
import { Models } from 'appwrite';
import { defaultAvatar, editIconObj } from '@/constants';
import { multiFormatDateString } from '@/lib/utils';
import { UPDATE_POST, POSTS } from '@/constants/routes';
import { useUserContext } from '@/context/AuthContext';
import PostStats from './PostStats';
import UserAvatar from './UserAvatar';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <UserAvatar imageUrl={post?.creator?.imageUrl} userId={user.id} />
          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>
              {post.creator.name}
            </p>
            <div className='flex-center flex-wrap gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular'>
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className='subtle-semibold lg:small-regular'>
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`${UPDATE_POST}/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'}`}
        >
          <img
            src={editIconObj.icon}
            alt={editIconObj.alt}
            width={20}
            height={20}
          />
        </Link>
      </div>
      <Link to={`/${POSTS}/${post.$id}`}>
        <div className='small-medium lg:base-medium py-5'>
          <p>{post.caption}</p>
          <ul className='flex gap-1 mt-2'>
            {post.tags.map((tag: string) => (
              <li key={tag} className='text-light-3'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || defaultAvatar}
          alt='Post Main Image'
          className='post-card_img'
        />
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
