import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import logo from "../../images/logo.png";
import { getUserDetails } from "../../features/User/userSlice";
import {logout} from '../../features/User/userSlice';

const Header = () => {
    const {userInfo, userToken, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // automatically authenticate user if token is found
    useEffect(() => {
        if (userToken) {
             dispatch(getUserDetails())
        }
    }, [userToken, dispatch]);

    return (
        <div className="page-header">
        <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand">
            <a href="/">
             <img src={logo} alt="FoodieRatie"/>
             </a>
            </div>
            <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerContent" aria-controls="navbarTogglerContent" aria-expanded="false" aria-label="Toggle navigation">
             <span><i className="fa-solid fa-bars"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#footer">Contact</a>
                    </li>
                </ul>
                <Link to='/user-profile'>
                <span>
                   {userInfo.id ? `Hi, ${userInfo.username}` : null}
                 </span>
                 </Link>
                 {userInfo.id ? (
                    <Link to='/'>
                    <button className='btn'  onClick={() => dispatch(logout())}>
                      Logout
                    </button>
                    </Link>
                ) : (
                <>
                 <Link to='/login'>
                     <button className='btn'>Login</button>
                </Link>
                <Link to='/register'>
                     <button className='btn'>Signup</button>
                </Link>
                </>
                )}
                {/* <div className="user-image">
                     <img src={user} alt="user" />
                </div> */}
            </div>
        </nav>
        
     </div>
    );
};

export default Header;