import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import './ProtectedRoute.scss';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user)

  // show unauthorized screen if no user is found in redux store
  if (!userInfo.id) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized💔</h1>
        <span>
          <Link to='/login' style={{ color: 'blue'}}>Login</Link> to gain access
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute