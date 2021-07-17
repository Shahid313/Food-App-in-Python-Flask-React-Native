import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import url from '../baseUrl';

_retrieveData = async (navigation) => {

    const value = await AsyncStorage.getItem('loggedIn');
    const parse = JSON.parse(value)
    if (parse != null) {
      navigation.reset({
          index:0,
          routes:[{name:'Home'}],
         
      });
    }else{
        return false
    }
  
};


const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
       
       _retrieveData(navigation)
    },[])

    const submitForm = () => {
        const data = new FormData();
        data.append('name',name);
        data.append('email',email);
        data.append('password',password);
        Axios.post(url+"/signup", data);
        navigation.navigate("SignIn");
    }

    const goToSignIn = () => {
        navigation.navigate("SignIn");
    }
    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            <Text style={styles.logo}>FOOD</Text>
            <TextInput 
            style={styles.nameInput} 
            placeholder="Enter Name"
            placeholderTextColor="#fff" 
            onChangeText={(e) => {setName(e)}}
            />

            <TextInput 
            style={styles.emailInput} 
            placeholder="Enter Email"
            placeholderTextColor="#fff"
            onChangeText={(e) => {
                setEmail(e)
                
            
            }}
            />

            <TextInput 
            style={styles.passwordInput} 
            placeholder="Enter Password"
            placeholderTextColor="#fff" 
            onChangeText={(e) => {setPassword(e)}}
            />

            <TouchableOpacity onPress={submitForm} style={styles.signUpButton}><Text style={styles.btnText}>Sign Up</Text></TouchableOpacity>
            <TouchableOpacity onPress={goToSignIn} style={styles.signinBtn}><Text style={styles.btnText}>signin</Text></TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fb8500'
    },

    logo:{
        fontSize:40,
        marginTop:80,
        fontWeight:'bold',
        color:'#fff'
    },

    nameInput:{
        height:60,
        width:300,
        marginTop:60,
        borderBottomWidth: 1,
        borderColor:'#fff',
        color:'white',
        fontSize:22,
    },

    emailInput:{
        height:60,
        width:300,
        marginTop:15,
        borderBottomWidth: 1,
        borderColor:'#fff',
        color:'white',
        fontSize:22,
    },

    passwordInput:{
        height:60,
        width:300,
        marginTop:15,
        borderBottomWidth: 1,
        borderColor:'#fff',
        color:'white',
        fontSize:22,
    },

    signUpButton:{
        width:300,
        height:50,
        backgroundColor:'white',
        borderRadius:25,
        marginTop:25,
        justifyContent:'center',
        alignItems:'center',

    },

    btnText:{
        color:'#fb8500',
        fontSize:20,
    },

    signinBtn:{
        width:80,
        height:30,
        backgroundColor:'white',
        borderRadius:15,
        marginTop:25,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default SignUpScreen;
