import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage'

const FavScreen = () => {
    const [favData, setFavData] = useState([]);
    useEffect(async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)
        Axios.get(url+`/get_fav/${parse.id}`).then((response) => {
            setFavData(response.data);
        })
    },[])
    return (
        <View style={styles.container}>
            {favData.map((item) => {
                return (
                    <View key={item.fav_food_id} style={styles.favfood}>
                    <Image style={styles.image} source={{uri:url+'/static/images/'+item.foodImage}}/>
                    <Text style={styles.foodname}>{item.foodName}</Text>
                </View> 
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },

    favfood:{
        marginTop:10,
        width:'80%',
        height:150,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    image:{
        width:100,
        height:100,
        borderRadius:7
    },
    foodname:{
        marginLeft:20,
        fontSize:30
    }
})

export default FavScreen;