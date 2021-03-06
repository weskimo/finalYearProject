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
import TeamPictures from './TeamPictures';
import EditTeamScreen from './EditTeamScreen';
import EditTeamEventsScreen from './EditTeamEventsScreen';
import FindPlayerScreen from './FindPlayer';




const Stack = createNativeStackNavigator();

function MyTeamsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTeamsHome" component={MyTeamsScreen} initialRouteName="MyTeamsHome" options={{headerShown: false}} />
      <Stack.Screen name="MyTeam" component={MyTeamScreen} />
      <Stack.Screen name="Create a Team" component={MakeNewTeamScreen} />
      <Stack.Screen name="Apply" component={ApplicationFormScreen} />
      <Stack.Screen name="ManageApplications" component={ManageApplications} />
      <Stack.Screen name="View Application" component={ViewApplicationScreen} />
      <Stack.Screen name="FindPlayers" component={FindPlayers} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="TeamPicture" component={TeamPictures} />
      <Stack.Screen name="EditTeam" component={EditTeamScreen} />
      <Stack.Screen name="EditEvents" component={EditTeamEventsScreen} />
      <Stack.Screen name="Player Profile" component={FindPlayerScreen} />
     
    </Stack.Navigator>
  );
}


export default MyTeamsStack;