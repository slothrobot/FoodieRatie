import React, { useState, useEffect } from 'react';
import FoodListing from '../FoodListing/FoodListing';
import { useDispatch} from 'react-redux';
import { fetchAsyncFoods, removeFoodList} from '../../features/Foods/foodSlice';
import "./Home.scss";
import IntroSection from '../IntroSection/IntroSection';

const Home = () => {
    // uesDispatch is a react-redux hook to dispatch actions in the redux store in react components
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    // use this hook to fetch data from API
    useEffect(()=>{
        dispatch(fetchAsyncFoods([keywords,page]));
        //to clean-up
        return ()=>{
            dispatch(removeFoodList());
        }
        // the [] is set here so that the above function will be rendered once, 
        //this is the useEffect()'s feature.
    },[dispatch, page]);
    // console.log(page);

    const [keywords, setKeywords] = useState("");
    const submitHandler = (e)=>{
        //to prevent from refreshing the page when clicking on the search button, use preventDefault
        e.preventDefault();
        if(keywords==="") return alert("Please enter some keywords");
        dispatch(fetchAsyncFoods([keywords, 1]));
        dispatch(removeFoodList());
        // setKeywords("");
        setPage(1);
    }

//the old way to fetch data, without using redux-toolkit 
    // const keywords='snacks';
    // useEffect(()=>{
    //     const fetchFoods = async ()=>{
    //         const response = await OpenFoodApi
    //         .get(`?action=process&json=true&tag_contains_0=contains&tagtype_0=categories&tag_0=${keywords}`)
    //         .catch((err)=>{
    //             console.log('Err: ', err);
    //         });
    //         console.log(response);
    //     };
    //     fetchFoods();
    // },[])

    return (
        <div className="body">
            <IntroSection />
            <div>
              <div className="search-bar" id="search">
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
            </div>
        <div className='banner-img'></div>
        <FoodListing />
            <div className='load-more'>
                <button className="btn btn-light" onClick={()=>{page>1? setPage(page-1):setPage(1)}}> « Prev </button>
                <button className="btn btn-light" onClick={()=>{setPage(page+1)}}> Next » </button>
            </div>
        </div>
    );
};

export default Home;