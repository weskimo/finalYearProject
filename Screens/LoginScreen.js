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

  const auth = getAuth();
  const user = auth.currentUser;
  
  
  

  const handleLogin = async () => {
    
    signInWithEmailAndPassword(authent, email, password)
    .then((response) =>{
      const id = firebase.auth().currentUser
      setId(id.uid)
      
    })
    .catch((response)=>{
      console.log("spider>!>!" + response);
    })
  }

  const setAsyncUserId = async () => {
    await AsyncStorage.setItem('@UserId', user.uid)
  }

  const fullLoginFunc = async () => {
    handleLogin
   await AsyncStorage.setItem('@UserId', user.uid)
    navigation.navigate('Home')
  }

  useEffect( async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    handleLogin
    setAsyncUserId
   // fullLoginFunc
  },);

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
      <Button title="Login" onPress={handleLogin}/>
      <Button title="setstate" onPress={() => {setId(user.uid)}} />
      <Button title='set Async' onPress={setAsyncUserId} />
      <Button title='Nav' onPress={() => {navigation.navigate('Home')}} />
      <Button title="fullLogin" onPress={fullLoginFunc}/> 
      
    </View>
  )
}

export default LoginScreen;