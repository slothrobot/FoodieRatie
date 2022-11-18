import axios from 'axios';
// import { response } from 'express';
import React, {useState, useEffect } from 'react';
import './AllRates.scss';
import Stars from './Stars';

const AllRates = (props) => {
    const [reviews, setReviews] = useState([]);
    const foodId = props.foodId;

    useEffect(() =>{
        axios.post('/api/rate/allRates', {foodId: foodId})
            .then(response =>{
                if(response.data.success){
                    setReviews(response.data.allRates)
                }else{
                    console.log('Failed to get all reviews.')
                }
            });
    },[]);

    const renderAllRates = reviews.map((rate, index) =>{

        return(
            <div className='single-rate'>
                <div className='user-info'>
                    <span>{rate.userName}</span>
                    <p>
                    <Stars value={rate.userRate}/>
                     {rate.rateTime}</p>
                    <p>{rate.userReview}</p>
                </div>
            </div>
        )
    })

    return (
        <div className='show-all-rates'>
        <h3>Foodie Reviews</h3>
        {reviews.length > 0 ? (
            renderAllRates
        ): (
            <div className='no-review'>
                <h4>Be the first reviewer!</h4>
            </div>
        )}
            
        </div>
    );
};

export default AllRates;