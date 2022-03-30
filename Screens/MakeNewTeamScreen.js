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


const MakeNewTeamScreen = () => {

    const navigation = useNavigation();

    const [userId, setUserId] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [teamId, setTeamId] = useState('')
    const [teamGame, setTeamGame] = useState('')


    useEffect( async () => {
        const id = await AsyncStorage.getItem('@UserId')
        setUserId(id)
    }) 

 
    const makeTeam = async () => {
        const docRef = await addDoc(collection(db,"Teams"), {
            "name": name,
            "email": email,
            "bio": bio,
            "game": teamGame
        });
        setTeamId(docRef.id)
        console.log("Document written with ID: ", docRef.id);
    }

    /*
    const createTeamUsers = async () => {
        const myDoc = doc(db, 'Teams', teamId, "TeamUsers", userId );
        const docData = {
            "teamOwnerId": userId,
            "admin": true,
            "member": true,
            "teamid": teamId
            
        }
        setDoc(myDoc,docData)
        .then(()=>{
            alert("Users created");
           // navigation.navigate("MyTeams")
            
       })
        .catch((error)=>{
            alert(error.message);
            
      })
    } 
    <Button title="Make Users" onPress={createTeamUsers}/>
    */

    const updateMyProfile = async () => {
        const myProfile = doc(db, "Users", userId);

        await updateDoc(myProfile, {
            teams: arrayUnion(name)
        });}

    const generatePlayersColl = async () => {
        const docRef = await addDoc(collection(db,"Teams", teamId,"Players"), {
            admin: "Yes",
            userId: userId

        });
        console.log("Document written in Players collections with ID: ", docRef.id);
    }

    const generatePrivateColl = async () => {
        const docRef = await addDoc(collection(db,"Teams", teamId,"Private"), {
            admin: "Yes",
            userId: userId

        });
        console.log("Document written in Players collections with ID: ", docRef.id);
    }

    const doItAll = async () => {
        makeTeam;
        updateMyProfile;
        generatePlayersColl;
        generatePrivateColl;
    }
        
       

    

    // const messageRef = doc(db, "rooms", "roomA", "messages", "message1");

    return (
        <SafeAreaView>
        <Text>MakeNewTeamScreen </Text>
        <TextInput
        placeholder='Team Email here...'
        value={email}
        onChangeText={text => setEmail(text)}
        />
        <TextInput
        placeholder='Team Name here...'
        value={name}
        onChangeText={text => setName(text)}
        />
        <TextInput
        placeholder='Team Bio (50 words max)...'
        value={bio}
        onChangeText={text => setBio(text)}
        />
        <Button title="Make team" onPress={makeTeam}/>
        
        <Button title="Add Team to Users Doc" onPress={updateMyProfile}/>
        <Button title="Make Players" onPress={generatePlayersColl}/>
        <Button title="Make Private" onPress={generatePrivateColl}/>

        <Button title="DoItAll" onPress={ async () => {makeTeam;updateMyProfile;generatePlayersColl;generatePrivateColl}}/>

        
    </SafeAreaView>
    )
}

export default MakeNewTeamScreen