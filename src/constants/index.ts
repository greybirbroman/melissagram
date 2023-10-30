import defaultAvatar from '/assets/icons/profile-placeholder.svg';
import editIcon from '/assets/icons/edit.svg';
import deleteIcon from '/assets/icons/delete.svg';

const editIconObj = {
  icon: editIcon,
  alt: 'Edit Post, Icon'
}

const deleteIconObj = {
  icon: deleteIcon,
  alt: 'Delete Post, Icon'
}

export const sidebarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: '/assets/icons/people.svg',
    route: '/all-users',
    label: 'People',
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create Post',
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
  },
];

export { defaultAvatar, editIconObj, deleteIconObj }