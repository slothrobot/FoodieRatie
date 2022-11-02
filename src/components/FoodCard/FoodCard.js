import React from 'react';
import "./FoodCard.scss";
import { Link } from 'react-router-dom';

const FoodCard = (props) => {
    //destructure the data
    const {data} = props;
    return (
        <div className='card-item'>
            <Link to={`./product/${data._id}`} >
            <div className='card-inner'>
                <div className='card-top'>
                    <img src={data.image_url} alt={data.product_name} />
                </div>
                <div className='card-bottom'>
                    <div className='card-info'>
                        <h4>{data.product_name}</h4>
                        <p>{data.brands}</p>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    );
};

export default FoodCard;