import React from 'react';
import "./Footer.scss";

const Footer = () => {
    return (
        <div className='footer' id='footer'> 
          <div className='footer-icon'>
            <a href='https://twitter.com/FoodieRatie'><i className='fa-brands fa-twitter'></i></a>
            <a href='https://github.com/slothrobot'><i className='fa-brands fa-github'></i></a>
            <a href='mailto:xiongshj.fj@gmail.com'><i className='fa-solid fa-envelope'></i></a>
          </div>
        <div>© FoodieRatie 2021 - {new Date().getFullYear()}</div>
        <div>Made with ❤ by Sugi Studio</div>
        </div>
    );
};

export default Footer;