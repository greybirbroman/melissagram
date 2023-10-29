import { useParams, Link } from 'react-router-dom';
import { useGetPostById } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import Loader from '@/components/shared/Loader';
import { multiFormatDateString } from '@/lib/utils';
import { PROFILE, UPDATE_POST } from '@/constants/routes';
import { defaultAvatar, editIconObj, deleteIconObj } from '@/constants';
import { Button } from '@/components/ui/button';
import PostStats from '@/components/shared/PostStats';

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending) return <Loader />;

  const handleDeletePost = () => {};

  return (
    <div className='post_details-container'>
      <div className='post_details-card'>
        <img
          src={post?.imageUrl}
          alt='Current Post, Image'
          className='post_details-img'
        />

        <div className='post_details-info'>
          <div className='flex justify-between w-full'>
            <Link
              to={`/${PROFILE}/${post?.creator.$id}`}
              className='flex items-center gap-3'
            >
              <img
                src={post?.creator?.imageUrl || defaultAvatar}
                alt='Post Author, Avatar'
                className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
              />
              <div className='flex flex-col'>
                <p className='base-medium lg:body-bold text-light-1'>
                  {post?.creator.name}
                </p>
                <div className='flex-center gap-2 text-light-3'>
                  <p className='subtle-semibold lg:small-regular'>
                    {multiFormatDateString(post?.$createdAt)}
                  </p>
                  -
                  <p className='subtle-semibold lg:small-regular'>
                    {post?.location}
                  </p>
                </div>
              </div>
            </Link>
            <aside className='flex-center'>
              <Link
                to={`/${UPDATE_POST}/${post?.$id}`}
                className={`${user.id !== post?.creator.$id && 'hidden'}`}
              >
                <img
                  src={editIconObj.icon}
                  alt={editIconObj.alt}
                  width={24}
                  height={24}
                />
              </Link>
              <Button
                variant='ghost'
                className={`ghost_details-delete_btn ${
                  user.id !== post?.creator.$id && 'hidden'
                }`}
                onClick={handleDeletePost}
              >
                <img
                  src={deleteIconObj.icon}
                  alt={deleteIconObj.alt}
                  width={24}
                  height={24}
                />
              </Button>
            </aside>
          </div>

          <hr className='border w-full border-dark-4/80' />

          <div className='flex flex-col flex-1 w-full small-medium lg:base-medium'>
            <p>{post?.caption}</p>
            <ul className='flex gap-1 mt-2'>
              {post?.tags?.map((tag: string) => (
                <li key={tag} className='text-light-3'>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>

          <div className='w-full'>
            <PostStats post={post} userId={user.id}/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostDetails;
