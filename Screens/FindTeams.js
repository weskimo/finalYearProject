import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
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




function FindTeamsScreen({ route, navigation }) {


  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')

  const [selectedTeam, setSelectedTeam] = useState('')
 
  const [teams, setTeams] = useState([])
  const [teamNames, setTeamNames] = useState([])

  useEffect( async () => {
    const getId = await AsyncStorage.getItem('@UserId')
    setUserId(getId)
        });

  // gets the ID of every team and puts them in a list.
  const getTeams = async () => {
    const querySnapshot = await getDocs(collection(db, "Teams"));
    querySnapshot.forEach( async (doc) => {
      setTeams(teams => [...teams, doc.id])
      console.log(doc.id, " => ", doc.data())
    })
  }

  const getTeamNamesList = async() => {
    teams.forEach( async (docId) => {

      const teamId = docId;

      const docRef = doc(db, "Teams", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTeamNames(teamNames => [...teamNames, docSnap.get('name')])
        console.log("Document data:", docSnap.get('name'));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
          })
  }

  const getData = async () => {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        
        console.log("Document data:", docSnap.get('firstName'));
        console.log("Document data:", docSnap.get('lastName'));
        
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    
}
  

  return (
        
        <View>
            <Text>FindTeams:</Text>
            <Button title="getUserData" onPress={getData} />
            <Button title="getTeams" onPress={getTeams} />
            <Button title="GetNames" onPress={getTeamNamesList} />
            <FlatList
              data={teamNames}
              renderItem={({item}) => (
                <View>
                  <Text>{item}</Text>
                  <Button title="SelectTeam" onPress={() => setSelectedTeam(teams[teamNames.indexOf(item)])} />
                  <Button title="ViewTeam" onPress={() => {navigation.navigate("TeamScreen", {
                    userId: userId,
                    teamId: selectedTeam
                  })}} />
                </View>
                )}
                keyExtractor={(item,index) => item.toString()}
            />
        </View>
  )
          
      }
    

    export default FindTeamsScreen;