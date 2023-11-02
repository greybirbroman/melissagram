import { Query } from 'appwrite';
import { appwriteConfig, databases } from './config';
import { IUpdateUser } from '@/types';
import { deleteFile, uploadFile, getFilePreview } from './postsApi';

export async function getInfiniteUsers({ pageParam }: { pageParam: number }) {
    const queries: any[] = [Query.orderDesc('$createdAt'), Query.limit(12)];
  
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }
  
    try {
      const users = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        queries
      );
  
      if (!users) throw Error;
  
      return users;
    } catch (error) {
      console.log(error);
    }
  }

export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc('$createdAt'), Query.limit(10)];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );
    if (!users) throw Error;
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;

  try {
    let image = {
      imageUrl: user.imageUrl,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(user.file[0]);

      if (!uploadedFile) throw Error;

      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageUrl: fileUrl };
    }
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.id,
      {
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        imageUrl: image.imageUrl,
      }
    );

    if (!updatedUser) {
      throw Error;
    }
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}