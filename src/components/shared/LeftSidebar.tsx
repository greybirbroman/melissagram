import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queries';

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='Logo Melissagram, image'
            width={190}
            height={56}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || `/assets/images/profile-placeholder.png`}
            alt='User Avatar, Image'
            className='w-14 h-14 rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <NavLink
                  to={link.route}
                  className='flex items-center gap-4 p-4'
                >
                  <img
                    src={link.imgURL}
                    alt='Link icon'
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant='ghost'
        className='shad-button_ghost'
        onClick={() => signOut()}
      >
        <img src='/assets/icons/logout.svg' alt='Logout icon' />
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
