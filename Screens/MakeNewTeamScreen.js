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
import { getDoc } from 'firebase/firestore';
import { StyleSheet } from 'react-native';


const MakeNewTeamScreen = () => {

    const [userId, setUserId] = useState('')


    useEffect( async () => {
        
    })

    const createTeam = async () => {
        const myDoc = doc(db, "Teams");
        const docData = {
            "teamOwnerId": userId,
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        }
        setDoc(myDoc,docData)
        .then(()=>{
            alert("Team created");
       })
        .catch((error)=>{
            alert(error.message);
      })
    }

    return (
        <SafeAreaView>
        <Text>MakeNewTeamScreen </Text>
      
        

        
    </SafeAreaView>
    )
}

export default MakeNewTeamScreen