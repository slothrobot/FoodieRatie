import React, { useEffect } from 'react';
import FoodListing from '../FoodListing/FoodListing';
import { useDispatch } from 'react-redux';
import { fetchAsyncFoods,fetchAsyncDrinks } from '../../features/Foods/foodSlice';
// import OpenFoodApi from '../../common/APIs/OpenFoodApi';

const Home = () => {
    // uesDispatch is a react-redux hook to dispatch actions in the redux store in react components
    const dispatch = useDispatch();
    
    const foodText = "snacks";
    const drinkText = "beverages";
    // use this hook to fetch data from API
    useEffect(()=>{
        dispatch(fetchAsyncFoods(foodText));
        // the [] is set here so that the above function will be rendered once, 
        //this is the useEffect()'s feature.
    },[dispatch]);
    useEffect(()=>{
        dispatch(fetchAsyncDrinks(drinkText));
        // the [] is set here so that the above function will be rendered once, 
        //this is the useEffect()'s feature.
    },[dispatch]);

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
        </div>
    );
};

export default Home;