import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc} from 'firebase/firestore';
import { StyleSheet } from 'react-native';


const MakeNewTeamScreen = () => {

    const navigation = useNavigation();

    const [userId, setUserId] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [teamId, setTeamId] = useState('')


    useEffect( async () => {
        const id = await AsyncStorage.getItem('@UserId')
        setUserId(id)
    }) 

    useEffect (() => {
        setTeamId(userId + name)
    },[name])

    const createTeam = async () => {
        
        const myDoc = doc(db, "Teams", teamId);
        const docData = {
            "name": name,
            "email": email,
            "bio": bio
        }
        setDoc(myDoc,docData)
        .then(()=>{
            
            alert("Team created");
            // navigation.navigate("MyTeams")
            
       })
        .catch((error)=>{
            alert(error.message);
            
      })
    }

    const createTeamUsers = async () => {
        const myDoc = doc(db, 'Teams', teamId, "Users", userId );
        const docData = {
            "teamOwnerId": userId,
            "admin": true
            
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
        <Button title="Make team" onPress={createTeam}/>
        <Button title="Make Users" onPress={createTeamUsers}/>

       
        

        
    </SafeAreaView>
    )
}

export default MakeNewTeamScreen