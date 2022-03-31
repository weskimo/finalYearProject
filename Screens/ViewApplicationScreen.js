import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
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


// when an item is selected on past page, we take that items id, and use that to open the application in theispage as a passed route props.
// on this page we need an accept/decline button that sends a notification, so we need to generate notifications somewhere on that next page. 


function ViewApplicationScreen ({ route, navigation }) {

  

    const [playerTag, setPlayerTag] = useState('')
    const [playerFirstName, setPlayerFirstName] = useState('')
    const [playerLastName, setPlayerLastName] = useState('')
    const [playerBio, setPlayerBio] = useState('')
    const [mainGame, setPlayerMainGame] = useState('')
    const [DOB, setPlayerDob] = useState('')
    const [achievements, setAchievements] = useState('')

    const [teamId, setTeamId] = useState('')
    const [applicationId, setApplicationId] = useState('')



    useEffect(() => {
        const itemId  = route.params.teamId
        const applicationId = route.params.applicationId
        setTeamId(itemId)
        setApplicationId(applicationId)
      })

    return (
        <SafeAreaView>
            <Text>View 1 Application:</Text>

            <Text>{applicationId}</Text>
        </SafeAreaView>
    )
}


export default ViewApplicationScreen;