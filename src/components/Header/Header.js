import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncFoods } from "../../features/Foods/foodSlice";
import user from "../../images/user.png";
import "./Header.scss";
import logo from "../../images/logo.png";

const Header = () => {
    const [keywords, setKeywords] = useState("");
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        //to prevent from refreshing the page when clicking on the search button, use preventDefault
        e.preventDefault();
        if(keywords==="") return alert("Please enter some keywords");
        dispatch(fetchAsyncFoods(keywords));
        setKeywords("");
    }
    return (
        <div className="page-header">
        <div className="header">
            <div className="logo">
            <Link to="/">
            <img src={logo} alt="FoodieRatie"/>
            </Link>
            </div>
            <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input 
                    type="text" 
                    value={keywords} 
                    placeholder="Search..." 
                    onChange={(e)=>setKeywords(e.target.value)}
                    />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div className="user-image">
                <img src={user} alt="user" />
            </div>
        </div>
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
     </div>
    );
};

export default Header;