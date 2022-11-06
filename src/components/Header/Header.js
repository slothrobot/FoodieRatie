import React from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import logo from "../../images/logo.png";

const Header = () => {
    return (
        <div className="page-header">
        <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand">
            <Link to="/">
             <img src={logo} alt="FoodieRatie"/>
            </Link>
            </div>
            <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerContent" aria-controls="navbarTogglerContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
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
                <div className="user-image">
                     <img src={user} alt="user" />
                </div>
            </div>
        </nav>
        
     </div>
    );
};

export default Header;