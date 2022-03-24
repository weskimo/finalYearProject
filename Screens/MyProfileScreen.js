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
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/MyProfileStyles.js';

const MyProfileScreen = () => {

   // createDoc = async () => {
   //     const myDoc = doc(db, "Users", "MyDoc");
   //     const docData = {
   //         "name": this.state.firstName
   //     }
   //     setDoc(myDoc,docData)
   //     .then(()=>{
   //         alert("Document created");
   //     })
   //     .catch((error)=>{
   //         alert(error.message);
  //      })
   // }

   //  <Button title="makeDoc" onPress={this.createDoc()}/>

  const navigation = useNavigation();
  const [id, setId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const auth = getAuth();
  const user = auth.currentUser;
  
  const getAsync = async () => {
      const getId = await AsyncStorage.getItem('@UserId')
      setId(getId);
  }

  useEffect( async () => {
    const getId = await AsyncStorage.getItem('@UserId')
    setId(getId)
    getData
        });

    

    const getData = async () => {
        const docRef = doc(db, "Users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setFirstName(docSnap.get('firstName'))
            setLastName(docSnap.get('lastName'))
            console.log("Document data:", docSnap.get('firstName'));
            console.log("Document data:", docSnap.get('lastName'));
            
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        
    }

    
    


    



        return(
        <SafeAreaView style={Styles.pageContainer}>
            <Text>MyProfileScreen </Text>
            <Text>{id}</Text>
            <Text>{firstName} {lastName}</Text>
            <Button title="setAsync" onPress={getAsync} />
            <Button title ='GetData' onPress={getData} />

            
        </SafeAreaView>
        )
      
    }

    export default MyProfileScreen; 