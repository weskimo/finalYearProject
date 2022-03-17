import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import home from '../finalYearProject/Screens/LoggedInScreen.js';
import login from '../finalYearProject/Screens/LoginScreen.js';
import signup from '../finalYearProject/Screens/SignUpScreen.js';
import logout from '../finalYearProject/Screens/LogoutScreen.js';

const Drawer = createDrawerNavigator();

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
