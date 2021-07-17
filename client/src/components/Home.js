import React,{useState, useEffect} from 'react';
import './Home.css';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import url from './baseUrl';

function Home() {
    let history = useHistory();
    const [foodName, setFoodName] = useState('');
    const [foodQuantity, setFoodQuantity] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodImage, setFoodImage] = useState({});
    const [foodData, setFoodData] = useState([]);

    const FormSubmission = (e) => {
        e.preventDefault(true);
        const data = new FormData();
        data.append('FoodName', foodName);
        data.append('FoodQuantity', foodQuantity);
        data.append('FoodDescription', foodDescription);
        data.append('FoodPrice', foodPrice);
        data.append('FoodImage', foodImage);

        Axios.post(url+"/add", data).then(res=>{
      console.log(res.data)
    }).catch(err=>console.log(err))
    window.location.reload(true);
    }

    useEffect(() => {
      Axios.get(url+"/get").then((response) => {
        setFoodData(response.data);
      });
    },[])
        

    const deleteFood = (id) => {
      Axios.delete(url+`/delete/${id}`);
      window.location.reload(true);
    }

  return (
    <div>
     <form onSubmit={FormSubmission} encType="multipart/form-data" className="admin">
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
     <input type="file" className="inputField" onChange={(e) => {setFoodImage(e.target.files[0])}}/>
     </div>
     <button>Add</button>
     </form>
    {foodData.map(data => {
      return (
        <div className="AllFoods" key={data.id}>
          <h2>Food Name: {data.foodName}</h2>
          <h3>Food Price: {data.foodPrice}</h3>
          <h3>Food Quantity: {data.foodQuantity}</h3>
          <p>Food Description: {data.foodDescription}</p>
          <img src={url+'/static/images/'+data.foodImage} className="FoodImage"  alt="Food"/>
          <button onClick={() => {deleteFood(data.id)}} className="deleteBtn">Delete</button>
          <button onClick={() => {history.push(`/Update/${data.id}`)}} className="deleteBtn">Update</button>
        </div>
      )
    })}
    </div>
  );
}

export default Home;
