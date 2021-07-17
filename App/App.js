/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import FavScreen from './screens/FavScreen';
import FoodDetailsScreen from './screens/FoodDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

const HomeStack = createStackNavigator();
const FavStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', headerShown:false }}
      />
    </HomeStack.Navigator>
  );
}

function FavStackScreen() {
  return (
    <FavStack.Navigator>
      <FavStack.Screen
        name="Fav"
        component={FavScreen}
        options={{ tabBarLabel: 'Fav' }}
      />
    </FavStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </ProfileStack.Navigator>
  );
}

const BottomTabs = () => {
  return(

      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Fav') {
              iconName = 'heart';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Fav" component={FavStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
  )
}

const RootStack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen options={{headerShown:false}}  name="SignUp" component={SignUpScreen} />
        <RootStack.Screen options={{headerShown:false}} name="SignIn" component={SignInScreen} />
        <RootStack.Screen options={{headerShown:false}} name="Home" component={BottomTabs} />
        <RootStack.Screen name="FoodDetails" component={FoodDetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App;
