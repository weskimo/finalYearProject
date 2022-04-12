import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, FlatList, ScrollView} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";

import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
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
  const [mainRole, setMainRole] = useState('Mid')
  const [mainChamp, setMainChamp] = useState('')
  const [soloQRank, setSoloQRank] = useState('Iron')
  const [flexRank, setFlexRank] = useState('Iron')

  // tags for search
  const [tags, setTags] = useState([])
  const[newTag, setNewTag] = useState('')


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
        setTags(docSnap.get('tags'))
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

  const updateDbTags = async () => {
    
    const userProfile = doc(db, "Users", userId);
    await updateDoc(userProfile, {
        tags: arrayUnion(newTag)
    });}

  


        return(
        <ScrollView>
            <Text>Edit my profile</Text>
            <Button title="Change Picture" onPress={() => {navigation.navigate("ChangePicture", {
              userId: userId
            })}} color="#d90429"/>
            <Text>Your Account details:</Text>
            <Text>User ID: {userId}</Text>

            <Text>Tags: {tags}</Text>
            <Text>Add a Tag:</Text>
            <TextInput
              placeholder='Add Tag...'
              value={newTag}
              onChangeText={text => setNewTag(text)}
            />
            <Button title="Add Tag" onPress={() => {setTags(tags => [...tags, newTag])}}/>
            <Button title="Confirm" onPress={updateDbTags} />


            
            <Text>Change Gamer Tag:</Text>
            <TextInput
              placeholder='Change Gamer Tag to...'
              value={gamerTag}
              onChangeText={text => setGamerTag(text)}
            />
            <Text>Change Last Name:</Text>
            <TextInput
              placeholder='Change First Name to...'
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <Text>Change Last Name:</Text>
            <TextInput
              placeholder='Change Last Name to...'
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
            <Text>Change Bio:</Text>
            <TextInput
              placeholder='Change Bio to...'
              value={bio}
              onChangeText={text => setBio(text)}
            />
            <Button title="Confirm Changed Personal Details" onPress={setPersonalData} color="#d90429"/>

            <Text>Your League of Legends details:</Text>
            <Text>Main Role: {mainRole}</Text>
            <SafeAreaView style={styles.dropDowns}>
              <List.Section title="Select Your Role:">
                <List.Accordion
                  title="Role"
                  left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-" +  mainRole + ".png")}}/>}
                >
                  <List.Item title="Top" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Top.png")}} />} onPress={() => {setMainRole("Top")}}/>
                  <List.Item title="Jungle" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Jungle.png")}} />} onPress={() => {setMainRole("Jungle")}}/>
                  <List.Item title="Mid" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Mid.png")}} />} onPress={() => {setMainRole("Mid")}}/>
                  <List.Item title="Bot" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Bot.png")}} />} onPress={() => {setMainRole("Bot")}}/>
                  <List.Item title="Support" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Support.png")}} />} onPress={() => {setMainRole("Support")}}/>
                </List.Accordion>
              </List.Section>
              
            

              <List.Section title="Select Your SoloRank:">
                    <List.Accordion
                      title="Solo Queue"
                      left={props => <List.Icon icon={{uri: require("../RankedIcons/Emblem_" +  soloQRank + ".png")}}/>}
                      >
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setSoloQRank("Challenger")}} />
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setSoloQRank("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setSoloQRank("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />} onPress={() => {setSoloQRank("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setSoloQRank("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setSoloQRank("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setSoloQRank("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />}  onPress={() => {setSoloQRank("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />} onPress={() => {setSoloQRank("Challenger")}} />
                    </List.Accordion>
              </List.Section>      
              <List.Section title="Select Your FlexRank:">
                    <List.Accordion
                      title="Flex Queue"
                      left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_" +  flexRank + ".png")}}/>}
                      >
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setSoloQRank("Challenger")}}/>
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setSoloQRank("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setSoloQRank("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />}  onPress={() => {setSoloQRank("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setSoloQRank("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setSoloQRank("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setSoloQRank("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />} onPress={() => {setSoloQRank("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />}  onPress={() => {setSoloQRank("Iron")}} />
                    </List.Accordion>
                  </List.Section>
             </SafeAreaView>


            <Button title="Confirm Changed LoL Details" onPress={setLoLData} color="#d90429" />
        </ScrollView>
        )
      
    }

    const styles = StyleSheet.create({
      /* Other styles hidden to keep the example brief... */
      thumbnail: {
        width: 100,
        height: 100,
        resizeMode: "contain"
      },

      dropDowns: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

      }
    })

    export default EditMyProfileScreen;