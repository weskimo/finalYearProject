import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { db } from '../db/firestore';
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


const LoginScreen = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn,setIsSignedIn] = useState(false)
  const [userID, setId] = useState('d')

  const auth = getAuth();
  const user = auth.currentUser;
  
  

  const handleLogin = async () => {
    signInWithEmailAndPassword(authent, email, password)
    .then((response) =>{
      
      const id = firebase.auth().currentUser
      
      
      
      
    })
    .catch((response)=>{
      console.log("spider>!>!" + response);
    })
  }

  const setAsyncUserId = async () => {
    
    await AsyncStorage.setItem('@UserId', userID)
  }

  const fullLoginFunc = async () => {
   
    setAsyncUserId
    navigation.navigate('Home')
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
      <Button 
      title="Login"
      onPress={handleLogin}/>
      
     
     <Button title="fullLogin" onPress={fullLoginFunc}/> 
     <Button title="setstate" onPress={() => {setId(user.uid)}} />
    

      <Button title='set Async' onPress={setAsyncUserId} />
      <Button title='Nav' onPress={() => {navigation.navigate('Home')}} />
      
    </View>
  )
}

export default LoginScreen;