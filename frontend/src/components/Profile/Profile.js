import { useSelector } from 'react-redux';
import './Profile.scss';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <div className='profile'>
      <span>
        Welcome <strong>{userInfo?.username}</strong>! You can view this page
        because you're logged in.
        <p>More fun features will be added here later!</p>
      </span>
    </div>
  )
}
export default Profile