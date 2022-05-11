import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import LoggedInScreen from './LoggedInScreen';
import LoginScreen from './LoginScreen';




const Stack = createNativeStackNavigator();

function LoggedInStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} initialRouteName="Login" options={{headerShown: false}} />
      <Stack.Screen name="Draft Down" component={LoggedInScreen} initialRouteName="Login" options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}


export default LoggedInStack;