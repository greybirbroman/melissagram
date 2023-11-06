export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  imageId: string,
  bio: string;
};

export type IUpdateUser = {
  id: string,
  name?: string;
  file: File[];
  username: string;
  email: string;
  imageUrl: URL | string;
  imageId: string,
  bio: string;
}

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string,
  caption?: string;
  imageId: string,
  imageUrl: URL,
  file?: File[];
  location?: string;
  tags?: string;
};