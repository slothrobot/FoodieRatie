import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncDetails, getAllDetails, removeDetails} from '../../features/Foods/foodSlice';
import "./FoodDetail.scss";
import List from './Sections/List';

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
        //when the dispatch or imdbID changes, re-render the detail page
    },[dispatch, _id]);
 
    return (
        <div className="food-section">
        {/* this is to check if the data has been loaded, if no ready, show details on the way */}
            {Object.keys(data).length===0 ?
            (<h2>...Details on the way</h2>)
            :(
            <>
            <div className="section-left">
              <div className="food-title">{data.product.product_name}</div>
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
            <div className="section-right">
              <img src={data.product.image_url} alt={data.product.product_name} />
            </div>
        </>
        )
        }
      </div>
    );
};

export default FoodDetail;