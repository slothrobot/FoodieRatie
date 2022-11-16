import React, {useState, useEffect} from 'react';
import './Rate.scss';
import {useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Rate = (props) => {

    const {loading, userInfo} = useSelector((state) => state.user);
    const [rate, setRate] = useState(0);
    const [review, setReview] = useState('');
    const [hasReviewed, setHasReviewed] = useState(false);

    const {register, handleSubmit} = useForm();

    const variable = {
        userFrom: userInfo.id,
        foodId: props.foodId,
    }

    const getRate = () =>{
        axios.post('/api/rate/getRate', variable)
             .then(response =>{
                if(response.data.success){
                        setRate(response.data.rate.userRate)
                        setReview(response.data.rate.userReview)
                        console.log(rate)
                        console.log(hasReviewed)
                }else{
                    console.log('Failed to get the review.')
                    }
            });
    }

    useEffect(()=>{

        axios.post('/api/rate/hasReviewed', variable)
             .then(response =>{
                if(response.data.success){
                    setHasReviewed(response.data.hasReviewed);
                    if(hasReviewed){
                        getRate();
                       }
                }else{
                    console.log('Failed to get review information.')
                }
             });
        
    }, [hasReviewed]);

    const submitHandler = (e)=>{
        if(!userInfo.id) return alert('Please login first')
        variable.userRate = e.userRate;
        variable.userReview = e.userReview;
        // const date = new Date();
        // variable.rateTime = date.getDay()+ '/' + date.getMonth()+ '/' + date.getFullYear();
        variable.rateTime = new Date();

        // if the user has not reviewed this product, click submit to submit reviews, show reviews in the area
            axios.post('/api/rate/addNewRate', variable)
                 .then(response =>{
                  if(response.data.success){
                    setHasReviewed(true);
                    setRate(response.data.doc.userRate);
                    setReview(response.data.doc.userReview);
                  }else{
                    console.log('Failed to add new review.')
                }
              });
    }

    const handleDelete = () =>{
        // if the user has reviewed this product, show reviews in the area, click delete to delete this review
            axios.post('/api/rate/deleteRate', variable)
                .then(response =>{
                    if(response.data.success){
                        setHasReviewed(false)
                    }else{
                      alert('Failed to remove from MyList')
                    }
              });
    }


    return (

        <div className='give-rate'>
            <h3>Rate this product</h3>
            {hasReviewed? (
                <div className='show-review'>
                 <p>{rate}</p>
                 <p>{review}</p>
             <button  onClick={()=>handleDelete()}>Delete</button>
              </div>
            ) : (
            <>
                
              <div className="rate-form">
                <form onSubmit={handleSubmit(submitHandler)}>
                <div className="form-group star-rating">
                <span className="stars">
                    <input 
                        type="radio"
                        name="rating"
                        id="rating-0"
                        value="0"
                        checked='checked'
                        {...register('userRate')}
                    />
                    {/* <label htmlFor="rating-0">0</label> */}
                    <input 
                        type="radio"
                        name="rating"
                        id="rating-1"
                        value="1"
                        {...register('userRate')}
                    /><label htmlFor="rating-1">1</label>
                    <input 
                        type="radio"
                        name="rating"
                        id="rating-2"
                        value="2"
                        {...register('userRate')}
                    /><label htmlFor="rating-2">2</label>
                    <input 
                        type="radio"
                        name="rating"
                        id="rating-3"
                        value="3"
                        {...register('userRate')}
                    /><label htmlFor="rating-3">3</label>
                    <input 
                        type="radio"
                        name="rating"
                        id="rating-4"
                        value="4"
                        {...register('userRate')}
                    /><label htmlFor="rating-4">4</label>
                    <input 
                        type="radio"
                        name="rating"
                        id="rating-5"
                        value="5"
                        {...register('userRate')}
                    /><label htmlFor="rating-5">5</label>
                </span>
                </div>
                <div className="form-group review-section">
                    <textarea 
                        type="text" 
                        className="review" 
                        name="userReview" 
                        id="userReview"
                        cols="60" rows="5"
                        {...register('userReview')}
                        placeholder='How do you like this product?'
                        required
                        />
                </div>
                    <button type='submit' 
                    className="btn btn-dark"
                    disabled={loading}>
                     Submit
                    </button>
                </form>
            </div>
            </>
            )}
        </div>
       
    );
};

export default Rate;