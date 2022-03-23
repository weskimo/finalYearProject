import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView} from 'react-native';
import { db } from '../db/firestore';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";

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

  const auth = getAuth();
  const user = auth.currentUser;
  
  const getAsync = async () => {
      const getId = await AsyncStorage.getItem('@UserId')
      setId(getId);
  }


        return(
        <SafeAreaView>
            <Text>MyProfileScreen </Text>
            <Text>{id}</Text>
            <Button title="setAsync" onPress={getAsync} />
            
              
           

        
            

            
        </SafeAreaView>
        )
      
    }

    export default MyProfileScreen;