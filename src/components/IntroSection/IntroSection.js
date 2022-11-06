import React from 'react';
import "./IntroSection.scss";
// import Slider from 'react-slick';
// import { Settings } from '../../common/settings';


const IntroSection = () => {
    return (
        <div className="row site-intro">
        <div className="col-lg-6 slogan">
            <span>Find, Rate and Comment on Your Fav Snack 😋</span>
        </div>
        {/* to upgrade this part to be cool carousel! */}
        <div className="col-lg-6 features">
            <p>🔍 Search among 2,650,000+ food products</p>
            <p>✔️ Check the ingredients and allergens</p>
            <p>📝 Add new product to your wishlist</p>
        </div>
    </div>
    );
};

export default IntroSection;