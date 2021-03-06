import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoggedInScreen from '../finalYearProject/Screens/LoggedInScreen.js';
import LoginScreen from '../finalYearProject/Screens/LoginScreen.js';
import LoggedInStack from './Screens/LoggedInStack.js';
import SignUpScreen from '../finalYearProject/Screens/SignUpScreen.js';
import logout from '../finalYearProject/Screens/LogoutScreen.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { auth } from './db/firestore.js';

const Drawer = createDrawerNavigator();




class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Login'>
          
          <Drawer.Screen name='Login' component={LoggedInStack}/>
          <Drawer.Screen name='Sign Up' component={SignUpScreen}/>
          <Drawer.Screen name='Logout' component={logout}/>
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;
