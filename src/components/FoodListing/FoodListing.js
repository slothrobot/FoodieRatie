import React from 'react';
import { useSelector } from 'react-redux';
import { getAllFoods,getAllDrinks } from '../../features/Foods/foodSlice';
import FoodCard from '../FoodCard/FoodCard';
import "./FoodListing.scss";
import Slider from 'react-slick';
import { Settings } from '../../common/settings';

const FoodListing = () => {
    //useSelector is a react-redux hook used to read data from the store in react components
    const foods = useSelector(getAllFoods);
    const drinks = useSelector(getAllDrinks);
    //now I have all the Foods and could display them on my web
    // console.log(Foods);
    let renderFoods = '';
    let renderDrinks = '';
    //if the Response(a property in the Foods obj) is true, loop through the Foods and return a food card for each one
    renderFoods =  (
        foods.products?.map((food, index)=>{
           return <FoodCard key={index} data={food} />
        })
    );

    renderDrinks = (
        drinks.products?.map((drink, index)=>{
           return <FoodCard key={index} data={drink} />
        })
    );

    return (
        <div className='food-wrapper'>
            <div className='food-list'>
                <h2>Snacks</h2>
                <div className='food-container'>
                <Slider {...Settings}>{renderFoods}</Slider>
                </div>
            </div>
            <div className='drink-list'>
                <h2>Beverages</h2>
                <div className='food-container'>
                <Slider {...Settings}>{renderDrinks}</Slider>
                </div>
            </div>
        </div>
    );
};

export default FoodListing;