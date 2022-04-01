import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, addDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { StyleSheet } from 'react-native';


function ApplicationFormScreen ({ route, navigation }) {

  


  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')

  const [playerTag, setPlayerTag] = useState('')
  const [playerFirstName, setPlayerFirstName] = useState('')
  const [playerLastName, setPlayerLastName] = useState('')
  const [playerBio, setPlayerBio] = useState('')
  const [mainGame, setPlayerMainGame] = useState('')
  const [DOB, setPlayerDob] = useState('')
  const [achievements, setAchievements] = useState('')

  const [applicationId, setApplicationId] = useState('')


  useEffect(() => {
    const itemId  = route.params.teamId
    const userId = route.params.userId
    setTeamId(itemId)
    setUserId(userId)
  })


  const apply = async () => {
      const docRef = await addDoc(collection(db,"Teams", teamId, "Applications"), {
          userId: userId,
          teamId: teamId,
          playerTag: playerTag,
          playerFirstName: playerFirstName,
          playerLastName: playerLastName,
          playerBio: playerBio,
          mainGame: mainGame,
          DOB: DOB,
          achievements: achievements,
          userId: userId
      });
      setApplicationId(docRef.id)
      console.log("Application written with ID: ", docRef.id);
  }




      return(
        <View>
            <Text>Applicationformscreen</Text>
            <Text>PlayerTag:</Text>
            <TextInput
              placeholder='PlayerTag here...'
              value={playerTag}
              onChangeText={text => setPlayerTag(text)}/>
            <Text>First Name:</Text>
            <TextInput
              placeholder='First Name here...'
              value={playerFirstName}
              onChangeText={text => setPlayerFirstName(text)}/>
            <Text>Last Name:</Text>
            <TextInput
              placeholder='Why you want to join here...'
              value={playerBio}
              onChangeText={text => setPlayerBio(text)}/>
            <Text>What Game are you applying for:</Text>
            <TextInput
              placeholder='What game are you applying for here...'
              value={mainGame}
              onChangeText={text => setPlayerMainGame(text)}/>
            <Text>Date of Birth:</Text>
            <TextInput
              placeholder='DOB here...'
              value={DOB}
              onChangeText={text => setPlayerDob(text)}/>
            <Text>List your relevant Achievements here:</Text>
            <TextInput
              placeholder='List relevant Achievements here...'
              value={achievements}
              onChangeText={text => setAchievements(text)}/>

              <Button title="Submit" onPress={apply}/>

              <Text>user: {userId} team: {teamId}</Text>
        </View>
        )
      }
    

    export default ApplicationFormScreen;