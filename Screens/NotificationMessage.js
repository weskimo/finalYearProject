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
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';


const NotificationMessage = (props) => {

const [theMessage, setTheMessage] = useState('')
const [notificationId, setTheNotificationId] = useState('')
const [userId, setUserId] = useState('')

useEffect(() => {
    setUserId(props.userid)
    
    
  }, [])

  useEffect(() => {
    setTheNotificationId(props.notificationid)
  })

  


const getMessage = async () => {
    const docRef = doc(db, "Users", userId, "Notifications", notificationId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setTheMessage(docSnap.get('message'))
        console.log("Document data:", docSnap.get('message'));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }  
}




return (
    <SafeAreaView>
        <Text>{notificationId}</Text> 
        <Text>{userId}</Text>
        <Text>{theMessage}</Text>
        <Button title="do it" onPress={getMessage}/>
    </SafeAreaView>
);

}


export default NotificationMessage;