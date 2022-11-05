import React, { useState, useEffect } from 'react';
import FoodListing from '../FoodListing/FoodListing';
import { useDispatch } from 'react-redux';
import { fetchAsyncFoods } from '../../features/Foods/foodSlice';
// import OpenFoodApi from '../../common/APIs/OpenFoodApi';

const Home = () => {
    // uesDispatch is a react-redux hook to dispatch actions in the redux store in react components
    const dispatch = useDispatch();
    
    const foodText = "";
    // const [page, setPage] = useState(1);
    // use this hook to fetch data from API
    useEffect(()=>{
        dispatch(fetchAsyncFoods(foodText));
        // the [] is set here so that the above function will be rendered once, 
        //this is the useEffect()'s feature.
    },[dispatch]);
    // console.log(page);

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
        <div>
        <div className='banner-img'></div>
        <FoodListing />
            {/* <div className='load-more'>
                <button onClick={()=>{page>1? setPage(page-1):setPage(1)}}>Previous</button>
                <button onClick={()=>{setPage(page+1)}}>Next</button>
            </div> */}
        </div>
    );
};

export default Home;