import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc, query, where, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import FindPlayersScreen from './FindPlayersScreen';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db , storage } from '../db/firestore.js';




export default function MyTeamScreen({ route, navigation }) {

  const [selectedProfileImage, setSelectedProfileImage] = useState('');


  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamBio, setTeamBio] = useState('')
  const [teamGame, setTeamGame] = useState('')
  const [teamEmail, setTeamEmail] = useState('')

  const [viewPermission, setViewPermission] = useState('nonMember')

  useEffect(() => {
    const userId = route.params.userId
    const teamIdd  = route.params.teamId
    setTeamId(teamIdd)
    setUserId(userId)
    console.log(userId + "fireant")
  })

  useEffect( async () => {
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
  }, [teamId])



  useEffect( async () => {
    const teams = collection(db, "Teams", teamId, "Players");
    const q = query(teams, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  if(doc.get('admin') == "Yes") {
    setViewPermission('admin')
  }  

  console.log(doc.id, " => ", doc.data());
  
  
})
  }, [teamId])

  const storageRef = ref(storage, "Images/Teams/" + teamId + ".jpg")
  const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/Teams/" + teamId +".jpg")

  useEffect( async () => { 
    getDownloadURL(down)
      .then((url) => {
        setSelectedProfileImage(url);
        console.log(url)
        console.log(selectedProfileImage)
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
  
          // ...
  
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }, [teamId])

  const getPic =  async () => {
    console.log(teamId)
    getDownloadURL(down)
      .then((url) => {
        setSelectedProfileImage(url);
        console.log(url)
        console.log(selectedProfileImage)
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
  
          // ...
  
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }

  

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



const getPermission = async () => {
  const teams = collection(db, "Teams", teamId, "Players");
  const q = query(teams, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  if(doc.get('admin') == "Yes") {
    setViewPermission('admin')
  }  

  console.log(doc.id, " => ", doc.data());
  
  
})
    
}


if(viewPermission == 'admin') {

  return (
        
        <View>
            <Text>MyTeamScreen admin</Text>
            <Text>{teamId}</Text>
            <Text>{teamName}</Text>
            <Text>{teamBio}</Text>
            <Text>{teamGame}</Text>


            <Button title="Find Players" onPress={() => {navigation.navigate("FindPlayers", {
              teamId:teamId,
              userId: userId
            })}} />

            <Button title="Manage Applications" onPress={() => {navigation.navigate("ManageApplications", {
              teamId:teamId,
              userId: userId
            })}} />

            <Button title="Edit Team Details" onPress={() => {navigation.navigate("EditTeam", {
              teamId: teamId,
            })}} />

            <Image
              source={{uri: selectedProfileImage}}
              style={Styles.thumbnail}
            />
        </View>
  )
          } else {
            return (
            <View>
            <Text>MyTeamScreen User</Text>
            
            <Text>{teamId}</Text>
            <Text>{teamName}</Text>
            <Text>{teamBio}</Text>
            <Text>{teamGame}</Text>
            <Image
              source={{uri: selectedProfileImage}}
              style={Styles.thumbnail}
            />
            
            

            <Button title="Apply Here!" onPress={() => {navigation.navigate('Apply', {
              teamId:teamId,
              userId: userId
            })}} />

            
            </View>

            )
          }
      }
      const Styles = StyleSheet.create({
        /* Other styles hidden to keep the example brief... */
        thumbnail: {
          width: 300,
          height: 300,
          resizeMode: "contain"
        }
      })