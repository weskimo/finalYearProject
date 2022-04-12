import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import  {  useEffect } from 'react';





const LoginScreen = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn,setIsSignedIn] = useState(false)
  const [userID, setId] = useState('')

  /*
  const auth = getAuth();
  const user = auth.currentUser;
  */
 
  const setAsyncUserId = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    await AsyncStorage.setItem('@UserId', user.uid)
  }
 


/*
  useEffect( async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    handleLogin
    setAsyncUserId
   // fullLoginFunc
  },);
*/

const oneClick = async () => {
  signInWithEmailAndPassword(authent, email, password)
    .then( async () =>{
      const auth = getAuth();
      const user = auth.currentUser;
      setId(user.uid)
      await AsyncStorage.setItem('@UserId', user.uid)
      console.log(user)
      return user
      
    })
    .catch(()=>{
      console.log("spider>!>!" + response);
    }).then((user) => {
      navigation.navigate('Home', {
        screen: 'MyProfile',
        params: {
          screen: 'MyProfileScreen',
          params: {userId: user.uid}
        }
            
          })

    })
  }

  return (
    <View>
      <Text>Login here:</Text>
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
      <Text>{userID}</Text>
      <Button title="Login" onPress={oneClick} color="#d90429" />
    
      
      
      
    </View>
  )
}

export default LoginScreen;