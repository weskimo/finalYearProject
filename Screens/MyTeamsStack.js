import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';
import MyTeamScreen from './MyTeamScreen.js';
import ApplicationFormScreen from './ApplicationFormScreen';
import ManageApplications from './ManageApplications.js';
import ViewApplicationScreen from './ViewApplicationScreen.js';
import FindPlayers from './FindPlayersScreen';
import PlayerScreen from './PlayerScreen';




const Stack = createNativeStackNavigator();

function MyTeamsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTeams" component={MyTeamsScreen} initialRouteName="MyTeams" options={{headerShown: false}} />
      <Stack.Screen name="MyTeam" component={MyTeamScreen} />
      <Stack.Screen name="Create a Team" component={MakeNewTeamScreen} />
      <Stack.Screen name="Apply" component={ApplicationFormScreen} />
      <Stack.Screen name="ManageApplications" component={ManageApplications} />
      <Stack.Screen name="View Application" component={ViewApplicationScreen} />
      <Stack.Screen name="FindPlayers" component={FindPlayers} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
}


export default MyTeamsStack;