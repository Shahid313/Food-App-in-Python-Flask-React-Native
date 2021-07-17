import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../baseUrl';

const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async () => {
        const Data = new FormData();
        Data.append('name', name);
        Data.append('password', password);
      await  Axios.post(url+"/signin", Data).then((response) => {
            if(response.data.loggedIn == true){

                        console.log(response.data.user)
                       AsyncStorage.setItem(
                        'loggedIn',
                        JSON.stringify(response.data.user)
                      );
                 

                navigation.reset({
                    index:0,
                    routes:[{name:'Home'}],
                   
                });
            }
        });
    }

    const goToSignUn = () => {
        navigation.navigate("SignUp");
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
            style={styles.passwordInput} 
            placeholder="Enter Password"
            placeholderTextColor="#fff"
            onChangeText={(e) => {setPassword(e)}}
            />

            <TouchableOpacity onPress={submitForm} style={styles.signUpButton}><Text style={styles.btnText}>Sign In</Text></TouchableOpacity>
            <TouchableOpacity onPress={goToSignUn} style={styles.signinBtn}><Text style={styles.btnText}>signup</Text></TouchableOpacity>
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