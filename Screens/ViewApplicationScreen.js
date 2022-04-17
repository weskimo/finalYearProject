import React, {Component, useState , useEffect, useDebugValue} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { async, FirebaseSignInProvider } from '@firebase/util';
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
    const [mainRole, setMainRole] = useState('Mid')
    const [soloQRank, setSoloQRank] = useState('Gold')
    const [flexRank, setFlexRank] = useState('Gold')
    const [playerId, setPlayerId] = useState('')

    const [teamName,setTeamName] = useState('')


    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')
    const [applicationId, setApplicationId] = useState('')
    useEffect(() => {
        const teamId  = route.params.teamId
        const userId = route.params.userId
        const applicationId = route.params.applicationId
        setTeamId(teamId)
        setApplicationId(applicationId)
      })


    useEffect( async() => {
        const docRef = doc(db, "Teams", teamId, "Applications", applicationId);
        const docRef2 = doc(db, "Teams", teamId)
        const docSnap = await getDoc(docRef);
        const docSnap2 = await getDoc(docRef2);
        if (docSnap.exists()) {
            setPlayerTag(docSnap.get('playerTag'))
            setPlayerFirstName(docSnap.get('playerFirstName'))
            setPlayerLastName(docSnap.get('playerLastName'))
            setPlayerBio(docSnap.get('bio'))
            setMainRole(docSnap.get('mainRole'))
            setFlexRank(docSnap.get('flexRank'))
            setPlayerId(docSnap.get('userId'))
            setTeamName(docSnap2.get('name'))
            setSoloQRank(docSnap.get('soloQRank'))
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }, [teamId])


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
            setMainRole(docSnap.get('mainRole'))
            
            setPlayerId(docSnap.get('userId'))
            setTeamName(docSnap2.get('name'))
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        
    }


    const acceptApplication = async () => {
        const docRef = await addDoc(collection(db,"Teams", teamId, "Players"), {
            'playerTag': playerTag,
            'userId': playerId,
            'admin': 'no'
        });
        console.log("Document written with ID: ", docRef.id);
        const userProfile = doc(db, "Users", playerId);
        await updateDoc(userProfile, {
            teams: arrayUnion(teamName)
        })
        const application = doc(db, "Teams", teamId, "Applications", applicationId);
        await deleteDoc(application);
        const docRef2 = await addDoc(collection(db,"Users", playerId, "Notifications"), {
            'message': 'You have been ACCEPTED to join ' + teamName
        });
        setApplicationId(docRef2.id)
        console.log("Notification written with ID: ", docRef2.id);
        navigation.navigate("MyTeam", {
            teamId: teamId,
            userId: userId
          })

    }
    const declineApplication = async () => {
        const docRef = await addDoc(collection(db,"Teams", teamId, "Players"), {
            'playerTag': playerTag,
            'userId': playerId,
            'admin': 'no'
        });
        console.log("Document written with ID: ", docRef.id);
        const userProfile = doc(db, "Users", playerId);
        await updateDoc(userProfile, {
            teams: arrayUnion(teamName)
        })
        const application = doc(db, "Teams", teamId, "Applications", applicationId);
        await deleteDoc(application);
        const docRef2 = await addDoc(collection(db,"Users", playerId, "Notifications"), {
            'message': 'You have been DECLINED to join ' + teamName
        });
        setApplicationId(docRef2.id)
        console.log("Notification written with ID: ", docRef2.id);
        navigation.navigate("MyTeam", {
            teamId: teamId,
            userId: userId
          })
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

            <Text>{applicationId}</Text>
            <Text>{playerTag}</Text>
            <Text>{playerFirstName}</Text>
            <Text>{playerLastName}</Text>
            <Text>{playerBio}</Text>
            <Text>{mainRole}</Text>
            <Text>{soloQRank}</Text>
            <Text>{flexRank}</Text>
            <Text>{playerId}</Text>

            <Button title="Accept" onPress={acceptApplication}/>
            <Button title="Decline" onPress={declineApplication}/>

            

        </SafeAreaView>
    )
}


export default ViewApplicationScreen;