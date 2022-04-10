import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc, setDoc } from 'firebase/firestore';
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";


function EditMyProfileScreen ({ route, navigation }) {
  
  // Account Details
  const [userId, setUserId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gamerTag, setGamerTag] = useState('')
  const [bio, setBio] = useState('')

  // League of Legends Details
  const [mainRole, setMainRole] = useState('')
  const [mainChamp, setMainChamp] = useState('')
  const [soloQRank, setSoloQRank] = useState('')
  const [flexRank, setFlexRank] = useState('')

  useEffect(() => {
    const userId = route.params.userId
    const pFirstName = route.params.firstName
    const pLastName = route.params.lastName
    const pBio = route.params.bio
    const pGamerTag = route.params.gamerTag

    setUserId(userId)
    setFirstName(pFirstName)
    setLastName(pLastName)
    setBio(pBio)
    setGamerTag(pGamerTag)
  }, [])

  useEffect( async () => {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setMainRole(docSnap.get('mainRole'))
        setMainChamp(docSnap.get('mainChamp'))
        setSoloQRank(docSnap.get('soloQRank'))
        setFlexRank(docSnap.get('flexRank'))
        console.log("Document data:", docSnap.get('firstName'));
        console.log("Document data:", docSnap.get('lastName'));
        
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
  }, [userId])

  const setLoLData = async () => {
    const cityRef = doc(db, 'Users', userId);
    setDoc(cityRef, 
      { 
        mainRole: mainRole,
        mainChamp: mainChamp,
        soloQRank: soloQRank,
        flexRank: flexRank 
      }, { merge: true });
  }

  const setPersonalData = async () => {
    const cityRef = doc(db, 'Users', userId);
    setDoc(cityRef, 
      { 
        gamerTag: gamerTag,
        firstName: firstName,
        lastName: lastName,
        bio: bio 
      }, { merge: true });
  }

        return(
        <View>
            <Text>Edit my profile</Text>
            <Text>Your Account details:</Text>
            <Text>User ID: {userId}</Text>
            <Text>Name: {firstName} {lastName}</Text>
            <Text>GamerTag:{gamerTag}</Text>
            <Text>Bio: {bio}</Text>

            <Button title="ChangePicture" onPress={() => {navigation.navigate("ChangePicture", {
              userId: userId
            })}} />
            <TextInput
              placeholder='Change First Name to...'
              value={gamerTag}
              onChangeText={text => setGamerTag(text)}
            />
            <TextInput
              placeholder='Change First Name to...'
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              placeholder='Change Last Name to...'
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
            <TextInput
              placeholder='Change Bio to...'
              value={bio}
              onChangeText={text => setBio(text)}
            />
            <Button title="Change Personal Details" onPress={setPersonalData} />

            <Text>Your League of Legends details:</Text>
            <TextInput
              placeholder='Change Main Role to...'
              value={mainRole}
              onChangeText={text => setMainRole(text)}
            />
            <TextInput
              placeholder='Change Main Champion to...'
              value={mainChamp}
              onChangeText={text => setMainChamp(text)}
            />
            <TextInput
              placeholder='Change current Solo Queue Rank to...'
              value={soloQRank}
              onChangeText={text => setSoloQRank(text)}
            />
            <TextInput
              placeholder='Change current Flex Queue to...'
              value={flexRank}
              onChangeText={text => setFlexRank(text)}
            />
            <Button title="Change Details" onPress={setLoLData} />
        </View>
        )
      
    }

    export default EditMyProfileScreen;