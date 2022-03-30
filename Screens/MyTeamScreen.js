import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, addDoc } from 'firebase/firestore';




function MyTeamScreen({ route, navigation }) {


  const [teamId, setTeamId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamBio, setTeamBio] = useState('')
  const [teamGame, setTeamGame] = useState('')
  const [teamEmail, setTeamEmail] = useState('')


  useEffect(() => {
    const itemId  = route.params.teamId
    setTeamId(itemId)
  })
  

  const getData = async () => {
    const docRef = doc(db, "Teams", teamId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setTeamName(docSnap.get('name'))
        setTeamGame(docSnap.get('game'))
        setTeamBio(docSnap.get('bio'))
        setTeamEmail(docSnap.get('email'))
        console.log("Document data:", docSnap.get('name'));
        console.log("Document data:", docSnap.get('game'));
        
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    
}


  return (
        
        <View>
            <Text>MyTeamScreen</Text>
            <Button title='loadData' onPress={getData} />
            <Text>{teamId}</Text>
            <Text>{teamName}</Text>
            <Text>{teamBio}</Text>
            <Text>{teamGame}</Text>
        </View>
  )
      }
    

    export default MyTeamScreen;