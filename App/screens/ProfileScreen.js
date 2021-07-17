import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../baseUrl';

const ProfileScreen = ({navigation}) => {
    const logout = () => {
        AsyncStorage.removeItem('loggedIn');
        navigation.navigate("SignUp");
    }
    return (
        <View style={styles.container}>
            <Button onPress={logout} title="logout"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProfileScreen;