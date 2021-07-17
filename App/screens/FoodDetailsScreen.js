import React,{useState, useEffect} from 'react';
import { View, Text,Image, StyleSheet,TextInput, TouchableOpacity, Alert } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-ionicons';
import url from '../baseUrl';


const FoodDetailsScreen = ({route}) => {
    const id = route.params.id;
    const [Data,setData] = useState([]);
    const [OrderedQuantity, setOrderQuantity] = useState('');
    const [fav, setFav] = useState(false);

    useEffect(() => {
        Axios.get(url+`/food_details?id=${id}`).then((response) => {
            setData(response.data);
        }).catch(err => console.log(err));

        Axios.get(url+`/red_star/${id}`).then((response) => {
            if (response.data.red == true){
                setFav(true);
            }else{
                setFav(false);
            }
        })
    },[]);

    const sendOrder = async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)
        const data = new FormData();
        data.append('foodName', Data.foodName);
        data.append('foodPrice', Data.foodPrice);
        data.append('foodQuantity', OrderedQuantity);
        data.append('name', parse.name);

        Axios.post(url+"/orders", data);
    }

    const addToFav = async () => {
        setFav(!fav);

        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value);

        if(fav == true){
            Axios.delete(url+`/delete_fav/${id}/${parse.id}`);
        }else{
            const data = new FormData();
            data.append('foodId', id);
            data.append('userId', parse.id)

            Axios.post(url+"/add_fav", data);
        }
    }

    return (
      
        <View>
           <Image source={{uri:url+'/static/images/'+Data.foodImage}} style={styles.bannerImage}/>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
               <Text style={styles.title}>{Data.foodName}</Text>
               <Icon onPress={addToFav} style={{marginTop:35,marginLeft:15}} name='heart' color={fav ? 'red': 'gray'}/>
               </View>
               <Text style={styles.price}>{Data.foodPrice} PKR</Text>
               <Text style={styles.description}>Available: {Data.foodDescription}</Text>
               <Text style={styles.quantity}>{Data.foodQuantity}</Text>
               <Text style={styles.label}>Enter the quantity you want to buy</Text>
               <TextInput placeholder="Quantity" onChangeText={(e) => {setOrderQuantity(e)}} style={styles.quantityInput}/>
                <TouchableOpacity onPress={sendOrder} style={styles.OrderBtn}><Text style={styles.btnTitle}>Order</Text></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    
    bannerImage:{
        width:'100%',
        height:220,
        
    },
    

    title:{
        color:'brown',
        textAlign:'center',
        marginTop:20,
        fontSize:40,
        fontWeight:'bold'
    },

    price:{
        textAlign:'center',
        marginTop:5,
        color:'brown',
        fontSize:20,
    },

    description:{
        textAlign:'center',
        marginTop:10,
        color:'brown',
        fontSize:20,
    },

    quantity:{
        textAlign:'center',
        marginTop:10,
        color:'brown',
        fontSize:20,
    },

    label:{
        marginTop:20,
        color:'brown',
        textAlign:'center'
    },

    quantityInput:{
        marginTop:20,
        borderColor:'brown',
        borderBottomWidth:1,
        width:200,
        textAlign:'center',
        marginLeft:115
    },

    OrderBtn:{
        backgroundColor:'brown',
        height:60,
        width:280,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:75,
        marginTop:25
    },

    btnTitle:{
        color:'white',
        fontSize:20
    }
})

export default FoodDetailsScreen;