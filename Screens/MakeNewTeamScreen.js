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


function MakeNewTeamScreen({ route, navigation }) {

   

    const [userId, setUserId] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [teamId, setTeamId] = useState('')
    const [teamGame, setTeamGame] = useState('')

    useEffect(() => {
        const userId = route.params.userId
        setUserId(userId)
        console.log(userId + "fireant")
      }, [])

 
    const makeTeam = async () => {
        if(name.length >= 1 && name.length < 322) {
            const docRef = await addDoc(collection(db,"Teams"), {
                "name": name,
                "bio": bio
            });
            setTeamId(docRef.id)
            console.log("Document written with ID: ", docRef.id);
         
            const myProfile = doc(db, "Users", userId);

            await updateDoc(myProfile, {
                teams: arrayUnion(name)
            })
            const docRef2 = await addDoc(collection(db,"Teams", docRef.id,"Players"), {
                admin: "Yes",
                userId: userId
            })
            console.log("Document written in Players collections with ID: ", docRef2.id);
            const docRef3 = await addDoc(collection(db,"Teams", docRef.id,"Private"), {
                admin: "Yes",
                userId: userId

            });
            console.log("Document written in Players collections with ID: ", docRef3.id);
        } else {
                console.log("Team Name must be between 1 and 322 chars")
            } 
    }

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


    return (
        <SafeAreaView>
        <Text>MakeNewTeamScreen </Text>
        <Text>Set Team Name:</Text>
        <TextInput
        placeholder='Team Name here...'
        value={name}
        onChangeText={text => setName(text)}
        />
        <Text>Set Team Bio:</Text>
        <TextInput
        placeholder='Team Bio (50 words max)...'
        value={bio}
        onChangeText={text => setBio(text)}
        />
        <Button title="Make team" onPress={makeTeam}/>
 
    </SafeAreaView>
    )
}

export default MakeNewTeamScreen;