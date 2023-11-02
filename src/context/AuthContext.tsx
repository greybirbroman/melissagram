import React from 'react';
import { IContextType, IUser } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/lib/appwrite/authApi';

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  imageId: '',
  bio: '',
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const updateUserContext = async () => {
    try {
      const current = await getCurrentUser();
      if (current) {
        setUser({
          id: current.$id,
          name: current.name,
          username: current.username,
          email: current.email,
          imageId: current.imageId,
          imageUrl: current.imageUrl,
          bio: current.bio,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuthUser = async () => {
    try {
      //setIsLoading(true);
      const current = await getCurrentUser();
      // console.log(current)

      if (current) {
        setUser({
          id: current.$id,
          name: current.name,
          username: current.username,
          email: current.email,
          imageUrl: current.imageUrl,
          imageId: current.imageId,
          bio: current.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //   localStorage.getItem('cookieFallback') === null
    if (localStorage.getItem('cookieFallback') === '[]') navigate('/sign-in');

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    updateUserContext
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
