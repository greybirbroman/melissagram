import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PROFILE, UPDATE_PROFILE } from '@/constants/routes';
import { editIconObj } from '@/constants';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  return (
    <Link to={`/${UPDATE_PROFILE}/${id}`}>
      <Button>edit profile</Button>
    </Link>
  );
};

export default Profile;
