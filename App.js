import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import home from '../finalYearProject/Screens/LoggedInScreen.js';

const Drawer = createDrawerNavigator();

class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='home'>
          <Drawer.Screen name='home' component={home}/>
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;
