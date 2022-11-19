import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncDetails, getAllDetails, removeDetails} from '../../features/Foods/foodSlice';
import "./FoodDetail.scss";
import List from './Sections/List';
import Rate from './Sections/Rate';
import AllRates from './Sections/AllRates';
import AverageScore from './Sections/AverageScore';

const FoodDetail = () => {
    const {_id} = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getAllDetails);

    useEffect(()=>{
        dispatch(fetchAsyncDetails(_id))
        //to clean up
        return ()=>{
            dispatch(removeDetails());
        }
        //when the dispatch or id changes, re-render the detail page
    },[dispatch, _id]);
 
    return (
      <div className='detail-page'>
        {/* this is to check if the data has been loaded, if no ready, show details on the way */}
            {Object.keys(data).length===0 ?
            (<div className='detail-help'><h2>...Details on the way</h2></div>)
            :(
            <>
            <div>
             <div className='food-title'>
              <h1>{data.product.product_name}</h1>
             </div>
             <div className="food-section row">
              <div className="section-left food-card col-lg-4 col-md-6">
               <div className='top-pic'>
                <img src={data.product.image_url} alt={data.product.product_name} />
               </div>
              </div>
             <div className="section-middle col-lg-4 col-md-6">
               <div className="food-rating">
                <div className="food-info">
                 <div>
                  <span>Brand</span>
                  <span>{data.product.brands}</span>
                 </div>
                 <div>
                  <span>Quantity</span>
                  <span>{data.product.quantity}</span>
                 </div>
                 <div>
                  <span>Barcode</span>
                  <span>{data.product._id}</span>
                 </div>
                 <div>
                  <span>Ingredients</span> 
                  <span>{data.product.ingredients_text}</span>
                 </div>
               </div>
              </div>
             </div>
            <div className='section-right col-lg-4 col-md-6'>
              <AverageScore 
                foodId={data.product._id} 
              />
              <div className='bottom-buttons'>
              <List 
                   foodId={data.product._id} 
                   foodName={data.product.product_name}
                   foodBrand={data.product.brands}
                   foodImage={data.product.image_url || data.product.product_name}
                   foodQuantity={data.product.quantity}
                   />
              </div>
             </div>
            </div>
          
        <div className='section-bottom'>
        <hr />
          <div className='rate-food'>
            <Rate 
             foodId={data.product._id} 
           />
          </div>
          <hr />
          <div className='other-rates'>
          
            <AllRates 
              foodId={data.product._id} 
            />
          </div>
        </div>
    </div>
        </>
        )
        }
          
    </div>
    );
};

export default FoodDetail;