import UserCard from './UserCard';
import { Models } from 'appwrite';

type AllUsersListProps = {
  users: Models.Document[];
};

const AllUsersList = ({ users }: AllUsersListProps) => {
  return (
    <ul className='user-grid'>
      {users.map((user) => (
        <li key={`user-${user.$id}`}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};

export default AllUsersList;
