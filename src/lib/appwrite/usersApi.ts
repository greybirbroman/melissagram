import { Query } from 'appwrite';
import { appwriteConfig, databases } from './config';

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
  const queries: any[] = [Query.orderDesc('$createdAt')];

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
