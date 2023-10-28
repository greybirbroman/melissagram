import {
  useQueries,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/authApi';
import { createPost } from '../appwrite/postsApi';
import { QUERY_KEYS } from './queryKeys';
import { INewUser, INewPost } from '@/types';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount
    });
  };

  export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };
  
