import React, {useState} from 'react';
import './Home.css';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import url from './baseUrl';
function Update() {
  let {id} = useParams();
  let history = useHistory();

  const [foodName, setFoodName] = useState('');
    const [foodQuantity, setFoodQuantity] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [newFoodImage, setNewFoodImage] = useState({});

    const UpdateForm = (e) => {
      e.preventDefault();
      const data = new FormData();
        data.append('FoodName', foodName);
        data.append('FoodQuantity', foodQuantity);
        data.append('FoodDescription', foodDescription);
        data.append('FoodPrice', foodPrice);
        data.append('newFoodImage', newFoodImage);
      Axios.put(url+`/update/${id}`, data);
      history.push('/')
    }

  return (
    <div>
      <form onSubmit={UpdateForm} encType="multipart/form-data" className="admin">
     <div className="field">
     <label>Food Name:</label>
     <input type="text" className="inputField" onChange={(e) => {setFoodName(e.target.value)}}/>
     </div>
     <div className="field">
     <label>Food Quantity:</label>
     <input type="text" className="inputField" onChange={(e) => {setFoodQuantity(e.target.value)}}/>
     </div>
     <div className="field">
     <label>Food Price:</label>
     <input className="inputField" type="text" onChange={(e) => {setFoodPrice(e.target.value)}}/>
     </div>
     <div className="field">
     <label>Food Description:</label>
     <textarea className="inputField" onChange={(e) => {setFoodDescription(e.target.value)}}></textarea>
     </div>
     <div className="field">
     <label>Food Image</label>
     <input type="file" className="inputField" onChange={(e) => {setNewFoodImage(e.target.files[0])}}/>
     </div>
     <button>Update</button>
     </form>
    </div>
  );
}

export default Update;
