import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { db } from '../db/firestore';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const LogoutScreen = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn,setIsSignedIn] = useState(false)

  const handleLogout = () => {
    signOut(authent)
    .then((response)=>{
      console.log("signed out")
      navigation.navigate("Login")
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <View>
      
      <Button 
      title="Logout"
      onPress={handleLogout}
      color="#d90429"/>
    </View>
  )
}

export default LogoutScreen;