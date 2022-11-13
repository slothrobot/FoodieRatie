import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './List.scss';

const List = () => {
    const { userInfo } = useSelector((state) => state.user);

    const handleClick = ()=>{
      if(!userInfo.id) return alert('Please login first')
      
    }
    return (
        <div className='addToList'>
            <button className='btn btn-dark' onClick={handleClick}>Add to MyList</button>
        </div>
    );
};

export default List;