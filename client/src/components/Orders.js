import React, { useEffect, useState } from 'react';
import './Home.css';
import Axios from 'axios';

const Orders = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://192.168.10.8:5000/get_orders").then((response) => {
      setData(response.data);
      console.log(response.data);
    })
  },[]);
      return(
        <div className="main">
      {Data.map((data) => {
        return (
        <div className="AllFoods" key={data.id}>
        <h2>Food Name: {data.foodName}</h2>
        <h3>Food Price: {data.foodPrice}</h3>
        <h3>Food Quantity: {data.foodQuantity}</h3>
        <h3>Ordered By: {data.name}</h3>
        <button className="deleteBtn">Order Completed</button>
      </div>
      )
        })}
      </div>
      )
        
}

export default Orders;