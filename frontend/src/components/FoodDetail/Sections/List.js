import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './List.scss';
// import { response } from 'express';

const List = (props) => {
    const {foodId, foodName, foodBrand, foodImage, foodQuantity} = props;
    const [listNumber, setListNumber] = useState(0);
    const [onList, setOnList] = useState(false);

    const { userInfo } = useSelector((state) => state.user);

    const handleClick = ()=>{
      if(!userInfo.id) return alert('Please login first')
      if(onList){
        // if the product is already on list, remove it from list, reduce 1 to the listNumber
        axios.post('/api/list/removeFromList', variable)
            .then(response =>{
                if(response.data.success){
                    setListNumber(listNumber - 1)
                    setOnList(!onList)
                }else{
                    alert('Failed to remove from MyList')
                }
            });

      }else{
        // if the product is not on list, put it on list, add 1 to the listNumber
        axios.post('/api/list/addToList', variable)
            .then(response =>{
                if(response.data.success){
                    setListNumber(listNumber + 1)
                    setOnList(!onList)
                }else{
                    alert('Failed to add to MyList.')
                }
            })
      }
      
    }

    const variable = {
        userFrom: userInfo.id,
        foodId: foodId,
        foodName: foodName,
        foodBrand: foodBrand,
        foodImage: foodImage,
        foodQuantity: foodQuantity,
    }

    useEffect(()=>{

        axios.post('/api/list/listNumber', variable)
        .then(response =>{
            if(response.data.success){
                setListNumber(response.data.listNumber)
            }else{
                console.log('Failed to get the data.')
            }
        });

        axios.post('/api/list/onList', variable)
        .then(response =>{
            if(response.data.success){
                setOnList(response.data.onList)
            }else{
                console.log('Failed to get List information.')
            }
        });

    }, []);

    return (
        <div className='addToList'>
            <button className='btn btn-dark' onClick={handleClick}>{onList? 'Remove from MyList' : 'Add to MyList'} {listNumber}</button>
        </div>
    );
};

export default List;