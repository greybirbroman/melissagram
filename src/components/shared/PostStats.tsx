import React, { useState, useEffect } from 'react';
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from '@/lib/react-query/queries';
import { Models } from 'appwrite';
import notLiked from '../../../public/assets/icons/like.svg';
import liked from '../../../public/assets/icons/liked.svg';
import notSaved from '../../../public/assets/icons/save.svg';
import saved from '../../../public/assets/icons/saved.svg';
import { checkIsLiked } from '@/lib/utils';
import Loader from './Loader';

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesCount = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesCount);
  const [isSaved, setIsSaved] = useState(false);

  const { data: currentUser } = useGetCurrentUser();
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();

  const savedPost = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPost);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPost) {
      setIsSaved(false);
      deleteSavedPost(savedPost.$id);
      return;
    }
    savePost({ postId: post?.$id || '', userId });
    setIsSaved(true);
  };

  return (
    <div className='flex justify-between items-center z-20'>
      <div className='flex gap-2 mt-5'>
        <img
          src={checkIsLiked(likes, userId) ? liked : notLiked}
          alt='Like, Icon'
          width={20}
          height={20}
          onClick={(e) => {
            handleLikePost(e);
          }}
          className='cursor-pointer'
        />
        <span className='small-medium lg:base-medium'>{likes.length}</span>
      </div>
      <div className='flex gap-2 mt-5'>
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? saved : notSaved}
            alt='Save to Favorites, Icon'
            width={20}
            height={20}
            onClick={(e) => handleSavePost(e)}
            className='cursor-pointer'
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
