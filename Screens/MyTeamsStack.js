import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';
import MyTeamScreen from './MyTeamScreen.js';


const Stack = createNativeStackNavigator();

function MyTeamsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTeams" component={MyTeamsScreen} initialRouteName="MyTeams" options={{headerShown: false}} />
      <Stack.Screen name="MyTeam" component={MyTeamScreen} />
      <Stack.Screen name="Create a Team" component={MakeNewTeamScreen} />
     
    </Stack.Navigator>
  );
}



export default MyTeamsStack;