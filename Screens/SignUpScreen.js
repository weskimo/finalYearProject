import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { db } from '../db/firestore';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';



const SignUpScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn,setIsSignedIn] = useState('')

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authent, email, password)
    .then((re) => {
      console.log(re);
    })
    .catch((re) => {
      console.log(re);
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
        placeholder='Password here...'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button 
      title="SignUp"
      onPress={handleSignUp}/>
    </View>
  )
}

export default SignUpScreen;

