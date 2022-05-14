import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc, query, where, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, addDoc } from 'firebase/firestore';




function ViewTeamScreen({ route, navigation }) {


  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamBio, setTeamBio] = useState('')
  const [teamGame, setTeamGame] = useState('')
  const [teamEmail, setTeamEmail] = useState('')

  const [viewPermission, setViewPermission] = useState('nonMember')


  useEffect(() => {
    const itemId  = route.params.teamId
    const userId = route.params.userId
    setTeamId(itemId)
    setUserId(userId)
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
            <Text>View Team</Text>
            <Button title='loadData' onPress={getData} />
            <Text>{teamId}</Text>
            <Text>{teamName}</Text>
            <Text>{teamBio}</Text>
            <Text>{teamGame}</Text>

            <Button title="Apply Here!" onPress={() => {navigation.navigate('Apply', {
              teamId:teamId,
              userId: userId
            })}} />
        </View>
  )
          
      }
    

    export default ViewTeamScreen;