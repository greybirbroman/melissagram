import './globals.css';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './_auth/forms/SignupForm';
import SigninForm from './_auth/forms/SigninForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from '@/components/ui/toaster';
import {
  Home, PostDetails, Profile, UpdateProfile, Explore, Saved, AllUsers, CreatePost, EditPost,
} from './_root/pages';
import {SIGN_IN, SIGN_UP, EXPLORE, SAVED, ALL_USERS, CREATE_POST, UPDATE_POST, POSTS, PROFILE, UPDATE_PROFILE} from './constants/routes'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* {PUBLIC} */}
        <Route element={<AuthLayout />}>
          <Route path={`/${SIGN_IN}`} element={<SigninForm />} />
          <Route path={`/${SIGN_UP}`} element={<SignupForm />} />
        </Route>

        {/* {PRIVATE} */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path={`/${EXPLORE}`} element={<Explore />} />
          <Route path={`/${SAVED}`} element={<Saved />} />
          <Route path={`/${ALL_USERS}`} element={<AllUsers />} />
          <Route path={`/${CREATE_POST}`} element={<CreatePost />} />
          <Route path={`/${UPDATE_POST}/:id`} element={<EditPost />} />
          <Route path={`/${POSTS}:id`} element={<PostDetails />} />
          <Route path={`/${PROFILE}/:id/*`} element={<Profile />} />
          <Route path={`/${UPDATE_PROFILE}/:id`} element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
