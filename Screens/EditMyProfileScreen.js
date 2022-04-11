import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, FlatList} from 'react-native';
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

import { List } from 'react-native-paper';



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


  // list
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

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
            
          

            <List.Section title="Select Your Rank:">
                  <List.Accordion
                    title="Solo Queue"
                    left={props => <List.Icon  icon="folder" />}
                    expanded={expanded}
                    onPress={handlePress}>
                    <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setSoloQRank("Challenger")}} />
                    <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_GrandMaster.png")}} />} onPress={() => {setSoloQRank("GrandMaster")}} />
                    <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setSoloQRank("Master")}} />
                    <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />} onPress={() => {setSoloQRank("Diamond")}} />
                    <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setSoloQRank("Platinum")}} />
                    <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setSoloQRank("Gold")}} />
                    <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setSoloQRank("Silver")}} />
                    <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />}  onPress={() => {setSoloQRank("Bronze")}} />
                    <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />} onPress={() => {setSoloQRank("Challenger")}} />
                  </List.Accordion>

                  <List.Accordion
                    title="Flex Queue"
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={expanded}
                    onPress={handlePress}>
                    <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setSoloQRank("Challenger")}}/>
                    <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_GrandMaster.png")}} />} onPress={() => {setSoloQRank("GrandMaster")}} />
                    <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setSoloQRank("Master")}} />
                    <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />}  onPress={() => {setSoloQRank("Diamond")}} />
                    <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setSoloQRank("Platinum")}} />
                    <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setSoloQRank("Gold")}} />
                    <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setSoloQRank("Silver")}} />
                    <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />} onPress={() => {setSoloQRank("Bronze")}} />
                    <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />}  onPress={() => {setSoloQRank("Iron")}} />
                  </List.Accordion>
                </List.Section>
            


            <Button title="Change Details" onPress={setLoLData} />
        </View>
        )
      
    }

    const styles = StyleSheet.create({
      /* Other styles hidden to keep the example brief... */
      thumbnail: {
        width: 100,
        height: 100,
        resizeMode: "contain"
      }
    })

    export default EditMyProfileScreen;