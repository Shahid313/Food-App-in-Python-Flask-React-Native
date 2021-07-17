import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import url from '../baseUrl';

const HomeUpScreen = ({navigation}) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        Axios.get(url+"/get").then((response) => {
            setFoods(response.data);
        })
    },[]);

    const foodDetails = (id) => {
        navigation.navigate("FoodDetails", {id:id});
    }

    return (
        <Pressable style={styles.container}>
            <Image style={styles.banner} source={require('../assets/img/banner.jpg')}/>
            <View style={styles.foods}>
                <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={true}
                keyExtractor={({item, key}) => {key}}
                data={foods}
                renderItem={({item, key}) => (<TouchableOpacity onPress={() => {foodDetails(item.id)}} style={styles.food}><Image style={styles.foodImg} source={{uri:url+'/static/images/'+item.foodImage}}/><Text style={styles.foodName}>{item.foodName}</Text></TouchableOpacity>)}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },

    banner:{
        width:"100%",
        height:170
    },
    foods:{
        flex:1,
        alignItems:'center',
    },
    food:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        marginRight:40,
        marginTop: 15,
        marginBottom:10,
        marginLeft:40,

    },

    foodImg:{
        width:130,
        height:130,
        borderRadius:10,
        marginBottom:7,
    },

    foodName:{
        fontSize:21,
        color:'#fb8500'
    }
})

export default HomeUpScreen;