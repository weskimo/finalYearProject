import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import home from '../finalYearProject/Screens/LoggedInScreen.js';
import login from '../finalYearProject/Screens/LoginScreen.js';
import signup from '../finalYearProject/Screens/SignUpScreen.js';
import logout from '../finalYearProject/Screens/LogoutScreen.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Drawer = createDrawerNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBkRKmNY7if3q5z2_pMC7kEn50CMy1McAE",
  authDomain: "esportsteammanagement.firebaseapp.com",
  projectId: "esportsteammanagement",
  storageBucket: "esportsteammanagement.appspot.com",
  messagingSenderId: "64960786238",
  appId: "1:64960786238:web:952f7550816303a488066f",
  measurementId: "G-MR2S1WWCTJ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name='Home' component={home}/>
          <Drawer.Screen name='Login' component={login}/>
          <Drawer.Screen name='Sign Up' component={signup}/>
          <Drawer.Screen name='Logout' component={logout}/>
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;
