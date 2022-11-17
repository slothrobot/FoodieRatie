import axios from 'axios';
import { mean, round } from 'lodash';
// import { response } from 'express';
import React, {useState, useEffect } from 'react';
import './AverageScore.scss';



const AverageScore = (props) => {
    const foodId = props.foodId;
    const [score, setScore] = useState(0);
    const [number, setNumber] = useState(0);

    useEffect(()=>{
        axios.post('/api/rate/allRates', {foodId: foodId})
            .then(response =>{
                if(response.data.success){
                    const scores = response.data.allRates.map((rate, index)=>{
                        return Number(rate.userRate);
                    });
                    setNumber(scores.length);
                    const averageScore = round(((mean(scores) * 2) *100 / 100), 1); 
                    setScore(averageScore);
                }else{
                    console.log('Failed to get average score information.')
                }
            });
    },[])

    return (
        <div className='average-score'>
            <div className='score'>
                <span>FoodieRatie Score: </span>
              </div>
              <div className='star-score'>
                ⭐⭐⭐⭐⭐ {score ? score : 0}/10
              </div>
              <div className='rate-number'>
                <span>Rated by {number} foodies</span>
              </div>
        </div>
    );
};

export default AverageScore;