import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { StyleSheet } from 'react-native';


// when an item is selected on past page, we take that items id, and use that to open the application in this page as a passed route props.
// on this page we need an accept/decline button that sends a notification, so we need to generate notifications somewhere on that next page. 


function ViewApplicationScreen ({ route, navigation }) {

  

    const [playerTag, setPlayerTag] = useState('')
    const [playerFirstName, setPlayerFirstName] = useState('')
    const [playerLastName, setPlayerLastName] = useState('')
    const [playerBio, setPlayerBio] = useState('')
    const [mainGame, setPlayerMainGame] = useState('')
    const [DOB, setPlayerDob] = useState('')
    const [achievements, setAchievements] = useState('')
    const [playerId, setPlayerId] = useState('')

    const [teamName,setTeamName] = useState('')

    const [teamId, setTeamId] = useState('')
    const [applicationId, setApplicationId] = useState('')
    useEffect(() => {
        const teamId  = route.params.teamId
        const applicationId = route.params.applicationId
        setTeamId(teamId)
        setApplicationId(applicationId)
      })


    const getData = async () => {
        const docRef = doc(db, "Teams", teamId, "Applications", applicationId);
        const docRef2 = doc(db, "Teams", teamId)
        const docSnap = await getDoc(docRef);
        const docSnap2 = await getDoc(docRef2);
        if (docSnap.exists()) {
            setPlayerTag(docSnap.get('playerTag'))
            setPlayerFirstName(docSnap.get('playerFirstName'))
            setPlayerLastName(docSnap.get('playerLastName'))
            setPlayerBio(docSnap.get('bio'))
            setPlayerMainGame(docSnap.get('mainGame'))
            setPlayerDob(docSnap.get('DOB'))
            setAchievements(docSnap.get('achievements'))
            setPlayerId(docSnap.get('userId'))
            setTeamName(docSnap2.get('name'))
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        
    }


    const acceptApplication = async () => {
        addPlayerToTeam;
        addTeamToPlayer;
        removeApplication;
    }


    const addPlayerToTeam = async () => {
        const docRef = await addDoc(collection(db,"Teams", teamId, "Players"), {
            'playerTag': playerTag,
            'userId': playerId,
            'admin': 'no'
        });
        console.log("Document written with ID: ", docRef.id);
    }

    const addTeamToPlayer = async () => {
        const userProfile = doc(db, "Users", playerId);
        await updateDoc(userProfile, {
            teams: arrayUnion(teamName)
        });}

    const removeApplication = async () => {
        const application = doc(db, "Teams", teamId, "Applications", applicationId);
        await deleteDoc(application);

    }

    const sendAcceptNoti = async () => {

        const docRef = await addDoc(collection(db,"Users", playerId, "Notifications"), {
            'message': 'You have been ACCEPTED to join ' + teamName
        });
        setApplicationId(docRef.id)
        console.log("Notification written with ID: ", docRef.id);
    }
    const sendDeclineNoti = async () => {

        const docRef = await addDoc(collection(db,"Users", playerId, "Notifications"), {
            'message': 'You have been DECLINED to join ' + teamName
        });
        setApplicationId(docRef.id)
        console.log("Notification written with ID: ", docRef.id);
    }

    return (
        <SafeAreaView>
            <Text>View 1 Application:</Text>
            <Button title="Get Application" onPress={getData}/>

            <Text>{applicationId}</Text>
            <Text>{playerTag}</Text>
            <Text>{playerFirstName}</Text>
            <Text>{playerLastName}</Text>
            <Text>{playerBio}</Text>
            <Text>{mainGame}</Text>
            <Text>{achievements}</Text>
            <Text>{DOB}</Text>
            <Text>{playerId}</Text>

            <Button title="AddPlayerToTeam" onPress={addPlayerToTeam}/>
            <Button title="AddTeamToPlayer" onPress={addTeamToPlayer}/>
            <Button title="Remove Application" onPress={removeApplication}/>

            <Button title="Accept" onPress={sendAcceptNoti} />
            <Button title="Decline" onPress={sendDeclineNoti} />

        </SafeAreaView>
    )
}


export default ViewApplicationScreen;