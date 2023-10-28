import { Link, useLocation } from 'react-router-dom';
import { bottombarLinks } from '@/constants';

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className='bottom-bar'>
      <ul className='flex justify-between gap-6 w-full'>
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`bottombar-link group rounded-[10px] flex-center flex-col gap-1 p-2 transition ${
                isActive && 'bg-primary-500'
              }`}
            >
              <Link
                to={link.route}
                className='flex flex-col justify-center items-center'
              >
                <img
                  src={link.imgURL}
                  alt='Link icon'
                  className={`${isActive && 'invert-white'}`}
                  width={16}
                  height={16}
                />
                <p className='tiny-medium text-light-2'>{link.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Bottombar;
