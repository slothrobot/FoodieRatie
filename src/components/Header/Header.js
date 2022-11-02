import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncDetails, fetchAsyncFoods, fetchAsyncDrinks } from "../../features/Foods/foodSlice";
import user from "../../images/user.png";
import "./Header.scss";

const Header = () => {
    const [keywords, setKeywords] = useState("");
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        //to prevent from refreshing the page when clicking on the search button, use preventDefault
        e.preventDefault();
        if(keywords==="") return alert("Please enter some keywords");
        dispatch(fetchAsyncFoods(keywords));
        dispatch(fetchAsyncDrinks(keywords));
        setKeywords("");
    }
    return (
        <div className="header">
            <div className="logo">
            <Link to="/">LogoHere</Link>
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
    );
};

export default Header;