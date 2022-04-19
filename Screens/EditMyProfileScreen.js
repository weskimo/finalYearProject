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
import { useIsFocused } from '@react-navigation/native';
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";

import { Divider, List } from 'react-native-paper';
import Styles from '../StyleSheets/EditProfileStyles'


function EditMyProfileScreen ({ route, navigation }) {

  // check if screen is focused
  const isFocused = useIsFocused();
  
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

  // set the basic states from the navi props
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
    isFocused;
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
      
  }, [userId, isFocused])

  const setLoLData = async () => {
    if(
      soloQRank.length < 1 ||
      flexRank.length < 1 ||
      mainRole.length  < 1 ||
      soloQRank.length > 320 ||
      flexRank.length > 320 ||
      mainRole.length > 320 
    ) {
      alert("Please select valid info from the drop down boxes");
    } else {
    const cityRef = doc(db, 'Users', userId);
    setDoc(cityRef, 
      { 
        mainRole: mainRole,
        soloQRank: soloQRank,
        flexRank: flexRank 
      }, { merge: true });
  }
}

  const setPersonalData = async () => {
    if(
      gamerTag.length < 1 || 
      firstName.length < 1 ||
      lastName.length < 1 ||
      gamerTag.length > 21 || 
      firstName.length > 21 || 
      lastName.length > 21 ||  
      bio.length > 80
    ) {
      alert("Names and tag must be between 1-21 Characters or numbers per field. Bio must be 80 chars or less");
    } else {
    const cityRef = doc(db, 'Users', userId);
    setDoc(cityRef, 
      { 
        gamerTag: gamerTag,
        firstName: firstName,
        lastName: lastName,
        bio: bio 
      }, { merge: true });
  }
}

  const updateDbTags = async () => {
    
    const userProfile = doc(db, "Users", userId);
    await updateDoc(userProfile, {
        tags: arrayUnion(newTag)
    });}

  


        return(
        <ScrollView>
          <SafeAreaView>
            
            <Button title="Change Picture" onPress={() => {navigation.navigate("ChangePicture", {
              userId: userId
            })}} color="#d90429"/>
           
            <Divider />
            <SafeAreaView style={Styles.changeDeetsBox}>
              <SafeAreaView style={Styles.changeDeetsTitleBox}>
                <Text style={Styles.changeDeetsTitle}>Change Your Details:</Text>
                
              </SafeAreaView>
              <Divider />
              <Text style={Styles.changeDeetsStyle}>Change Gamer Tag:</Text>
              <TextInput
                style={Styles.changeDeetsStyle}
                placeholder='Change Gamer Tag to...'
                value={gamerTag}
                onChangeText={text => setGamerTag(text)}
                maxLength={16}
              />
              <Divider />
              <Text style={Styles.changeDeetsStyle}>Change First Name:</Text>
              <TextInput
                style={Styles.changeDeetsStyle}
                placeholder='Change First Name to...'
                value={firstName}
                onChangeText={text => setFirstName(text)}
                maxLength={20}
              />
              <Divider />
              <Text style={Styles.changeDeetsStyle}>Change Last Name:</Text>
              <TextInput
                style={Styles.changeDeetsStyle}
                placeholder='Change Last Name to...'
                value={lastName}
                onChangeText={text => setLastName(text)}
                maxLength={20}
              />
              <Divider />
              <Text style={Styles.changeDeetsStyle}>Change Bio (80chars):</Text>
              <TextInput
                style={Styles.changeDeetsStyle}
                placeholder='Change Bio to...'
                value={bio}
                onChangeText={text => setBio(text)}
                maxLength={80}
              />
              <Divider />
            </SafeAreaView>
            <Button title="Confirm Changed Personal Details" onPress={setPersonalData} color="#d90429"/>
            <SafeAreaView style={Styles.lolDeetsTitleBox}>
              <Text style={Styles.lolDeetsTitle}>Your League of Legends details:</Text>
            </SafeAreaView>
            
            
              <Text style={Styles.mainRole}>Main Role: {mainRole}</Text>
              <List.Section title="Select Your Role:">
                <List.Accordion
                  title="Role"
                  left={props => <List.Icon  icon={{uri: require("../RankedRoles/" +  mainRole + ".png")}}/>}
                >
                  <List.Item title="Top" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Top.png")}} />} onPress={() => {setMainRole("Top")}}/>
                  <List.Item title="Jungle" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Jungle.png")}} />} onPress={() => {setMainRole("Jungle")}}/>
                  <List.Item title="Mid" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Mid.png")}} />} onPress={() => {setMainRole("Mid")}}/>
                  <List.Item title="Bot" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Bot.png")}} />} onPress={() => {setMainRole("Bot")}}/>
                  <List.Item title="Support" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Support.png")}} />} onPress={() => {setMainRole("Support")}}/>
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
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />} onPress={() => {setSoloQRank("Iron")}} />
                    </List.Accordion>
              </List.Section>      
              <List.Section title="Select Your FlexRank:">
                    <List.Accordion
                      title="Flex Queue"
                      left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_" +  flexRank + ".png")}}/>}
                      >
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setFlexRank("Challenger")}}/>
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setFlexRank("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setFlexRank("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />}  onPress={() => {setFlexRank("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setFlexRank("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setFlexRank("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setFlexRank("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />} onPress={() => {setFlexRank("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />}  onPress={() => {setFlexRank("Iron")}} />
                    </List.Accordion>
                  </List.Section>
             


            <Button title="Confirm Changed LoL Details" onPress={setLoLData} color="#d90429" />
            </SafeAreaView>
        </ScrollView>
        )
      
    }



    export default EditMyProfileScreen;