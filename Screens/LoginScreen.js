import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { db } from '../db/firestore';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';



const LoginScreen = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn,setIsSignedIn] = useState(false)

  const handleLogin = () => {
    signInWithEmailAndPassword(authent, email, password)
    .then((response) =>{
      setIsSignedIn(true);
      this.navigation.navigate('Home')
    })
    .catch((response)=>{
      console.log(response);
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
      <Button 
      title="Login"
      onPress={() => {handleLogin; navigation.navigate('Home')}}/>
      
      <Button title='profile' onPress={(() => navigation.navigate('Home'))}/>
    </View>
  )
}

export default LoginScreen;