import React from 'react';
import { useSelector } from 'react-redux';
import { getAllFoods } from '../../features/Foods/foodSlice';
import FoodCard from '../FoodCard/FoodCard';
import "./FoodListing.scss";

const FoodListing = () => {
    //useSelector is a react-redux hook used to read data from the store in react components
    const foods = useSelector(getAllFoods);
    //now I have all the Foods and could display them on my web
    // console.log(Foods);
    let renderFoods = '';
    //if the Response(a property in the Foods obj) is true, loop through the Foods and return a food card for each one
    renderFoods =  (
        foods.products?.map((food, index)=>{
           return <FoodCard key={index} data={food} />
        })
    );

    return (
        <div className='food-wrapper'>        
            <div className='food-list'>
            {Object.keys(foods).length===0 ?
               (<h2>...More Products On the Way</h2>)
             :( 
               <> 
               {foods.products.length===0?
               (<h2>No results found, try searching other keywords</h2>)
               :(
                <>
                <h2>Check them out</h2>
                <div className='food-container'>
                {renderFoods}
                </div>
                </>
               )}
               </>
            )}
            </div>
        </div>
    );
};

export default FoodListing;