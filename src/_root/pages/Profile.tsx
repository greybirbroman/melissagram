import { useEffect } from 'react';
import {
  useParams,
  Link,
  useLocation,
  useNavigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PROFILE, UPDATE_PROFILE, LIKED_POSTS, SAVED_POSTS } from '@/constants/routes';
import { editIconObj } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useGetUserById } from '@/lib/react-query/queries';
import UserAvatar from '@/components/shared/UserAvatar';
import Loader from '@/components/shared/Loader';
import GridPostList from '@/components/shared/GridPostList';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileDynamicPosts } from '@/constants';

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data: currentUser, isPending, refetch } = useGetUserById(id || '');

  console.log(currentUser);

  useEffect(() => {
    refetch();
  }, [id]);

  const profileStats = [
    {
      id: 'posts',
      count: currentUser?.posts.length,
    },
    {
      id: 'followers',
      count: 2,
    },
    {
      id: 'follow',
      count: 5,
    },
  ];

  const handleTabChange = (value: string) => {
    if (value === 'liked') navigate(`/${PROFILE}/${id}/liked-posts`);
    if (value === 'saved') navigate(`/${PROFILE}/${id}/saved-posts`);
    if (value === 'all') navigate(`/${PROFILE}/${id}`);
    else return
  };

  const ProfileDynamicButton = () =>
    currentUser?.$id === user.id ? (
      <Link to={`/${UPDATE_PROFILE}/${id}`} className='flex items-center gap-2'>
        <Button className='shad-button_dark_4'>
          <img
            src={editIconObj.icon}
            alt={editIconObj.alt}
            className='w-5 h-5'
          />
          Edit Profile
        </Button>
      </Link>
    ) : (
      <Button className='shad-button_primary'>Follow</Button>
    );

  if (isPending && !currentUser) return <Loader />;

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <UserAvatar imageUrl={currentUser?.imageUrl} size='large' userId={currentUser?.$id}/>
        <div>
          <div className='flex flex-wrap items-center sm:gap-10 gap-2 mb-2'>
            <h2 className='h3-bold md:h2-bold'>{currentUser?.name}</h2>
            <ProfileDynamicButton />
          </div>
          <p className='small-regular text-light-3'>@{currentUser?.username}</p>
          <ul className='flex gap-10 capitalize justify-start py-[22px] text-light-2'>
            {profileStats.map((stat) => (
              <li key={stat.id} className='flex flex-col'>
                <p className='text-primary-500 sm:text-[20px]'>{stat.count}</p>
                <span className='sm:text-[18px]'>{stat.id}</span>
              </li>
            ))}
          </ul>
          <p className='text-light-2'>{currentUser?.bio}</p>
          <Tabs defaultValue='all' className='max-w-[400px] mt-10'>
            <TabsList className='bg-dark-4 sm:text-[20px] flex w-fit gap-5 justify-between'>
              {profileDynamicPosts.map((item) => {
                const isActive =
                  (item.value === 'all' && pathname === `/${PROFILE}/${id}`) ||
                  pathname.includes(item.value);
                return (
                  <TabsTrigger
                    value={item.value}
                    className={`flex gap-2.5 capitalize w-full ${
                      isActive ? 'bg-dark-3' : ''
                    }`}
                    onClick={() => handleTabChange(item.value)}
                  >
                    <img src={item.tabIcon} alt={item.iconAlt} />
                    {item.value}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Routes>
        <Route
          index
          element={
            <GridPostList
              // title='All Posts'
              posts={currentUser?.posts}
              showUser={false}
              showStats={false}
            />
          }
        />
        <Route
          path={`/${LIKED_POSTS}`}
          element={
            <GridPostList
              // title='Liked Posts'
              posts={currentUser?.liked}
              showUser={false}
              showStats={false}
            />
          }
        />
        <Route
          path={`/${SAVED_POSTS}`}
          element={
            <GridPostList
              // title='Saved Posts'
              posts={currentUser?.save}
              showUser={false}
              showStats={false}
              isSaved={true}
            />
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
