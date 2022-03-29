import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';




function MyTeamScreen({ route, navigation }) {

  const [teamId, setTeamId] = useState('')

  useEffect(() => {
    const itemId  = route.params.teamId
    setTeamId(itemId)
  })
  

  return (
        
        <View>
            <Text>MyTeamScreen</Text>
            <Text>{teamId}</Text>
        </View>
  )
      }
    

    export default MyTeamScreen;