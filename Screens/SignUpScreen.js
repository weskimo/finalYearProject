import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { db } from '../db/firestore';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';

const SignUpScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignedIn,setIsSignedIn] = useState(false);
  const [userID, setId] = useState('d')

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authent, email, password)
    .then((re) => {
      console.log(re);
      setIsSignedIn(true)

    })
    .catch((re) => {
      console.log(re);
    })
  }


  const createDoc = async () => {
    const myDoc = doc(db, "Users", userID);
    const docData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    }
    setDoc(myDoc,docData)
    .then(()=>{
        alert("Document created");
   })
    .catch((error)=>{
        alert(error.message);
  })
}


  return (
    <View>
      <Text>Sign up.</Text>
      <TextInput
        placeholder='Email here...'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder='First Name here...'
        value={firstName}
        onChangeText={text => setFirstName(text)}
        
      />
      <TextInput
        placeholder='Last Name here...'
        value={lastName}
        onChangeText={text => setLastName(text)}
        
      />
      <TextInput
        placeholder='Password here...'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button 
      title="SignUp"
      onPress={handleSignUp}/>
      <Button title="Make Doc" onPress={async () => {
    const myDoc = doc(db, "Users", userID);
    const docData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    }
    setDoc(myDoc,docData)
    .then(()=>{
        alert("Document created");
   })
    .catch((error)=>{
        alert(error.message);
  })
} 
  }/>
  <Button 
      title="GetId"
      onPress={() => {setId(user.uid)}}/>
    </View>
    
  )
}

export default SignUpScreen;

