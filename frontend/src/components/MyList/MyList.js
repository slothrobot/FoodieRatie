import axios from 'axios';
// import { response } from 'express';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import './MyList.scss';

const MyList = () => {

    const {userInfo} = useSelector((state) => state.user);
    const [items, setItems] = useState([]);

    const fetchList = ()=>{
        axios.post('/api/list/getList', {userFrom: userInfo.id})
            .then(response =>{
              if(response.data.success){
                setItems(response.data.listItems)
              }else{
                alert('Failed to get MyList.')
              }
        });
    }

    useEffect(() =>{

       fetchList()

    },[]);

    const handleRemove = (foodId, userFrom) =>{
        const variable = {
            foodId,
            userFrom
        }
        axios.post('/api/list/removeFromList', variable)
            .then(response =>{
              if(response.data.success){
                  fetchList()
              }else{
                alert('Failed to remove from MyList')
              }
        });
    }

    const renderTableBody = items.map((item, index) =>{
            const path = '/product/' + `${item.foodId}`;
        return (
            <tr>
                <td><a href={path}>{item.foodName}</a></td>
                <td>{item.foodBrand}</td>
                <td>{item.foodQuantity}</td>
                <td>{item.foodId}</td>
                <td><button onClick={() => handleRemove(item.foodId, userInfo.id)} className='removeBtn'>Remove</button></td>
            </tr>
            )
    });

    return (
        <div className='fav'>
            <h3>Products on MyList</h3>

            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Quantity</th>
                        <th>Barcode</th>
                        <th>Remove from MyList</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    );
};

export default MyList;