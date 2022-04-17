import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, ScrollView, Image, TouchableOpacity} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, addDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { StyleSheet } from 'react-native';

import { Divider, List } from 'react-native-paper';


function ApplicationFormScreen ({ route, navigation }) {

  


  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')

  const [playerTag, setPlayerTag] = useState('')
  const [playerFirstName, setPlayerFirstName] = useState('')
  const [playerLastName, setPlayerLastName] = useState('')
  const [playerBio, setPlayerBio] = useState('')
  const [mainRole, setMainRole] = useState('Mid')
  const [soloQRank, setSoloQRank] = useState('Gold')
  const [flexRank, setFlexRank] = useState('Gold')
  

  const [applicationId, setApplicationId] = useState('')


  useEffect(() => {
    const itemId  = route.params.teamId
    const userId = route.params.userId
    setTeamId(itemId)
    setUserId(userId)
  })


  const apply = async () => {
      const docRef = await addDoc(collection(db,"Teams", teamId, "Applications"), {
          userId: userId,
          teamId: teamId,
          playerTag: playerTag,
          playerFirstName: playerFirstName,
          playerLastName: playerLastName,
          playerBio: playerBio,
          soloQRank: soloQRank,
          flexRank: flexRank,
          mainRole: mainRole,
          userId: userId
      });
      setApplicationId(docRef.id)
      console.log("Application written with ID: ", docRef.id);
  }




      return(
        <ScrollView>
            <Text>Please enter your details below:</Text>
            <Text>Summoner Name:</Text>
            <TextInput
              placeholder='SummonerName here...'
              value={playerTag}
              onChangeText={text => setPlayerTag(text)}/>
            <Text>First Name:</Text>
            <TextInput
              placeholder='First Name here...'
              value={playerFirstName}
              onChangeText={text => setPlayerFirstName(text)}/>
            <Text>Last Name:</Text>
            <TextInput
              placeholder='Last Name here...'
              value={playerLastName}
              onChangeText={text => setPlayerLastName(text)}/>
            <Text>Why do you want to join:</Text>  
            <TextInput
              placeholder='Why you want to join here...'
              value={playerBio}
              onChangeText={text => setPlayerBio(text)}/>
            <Text>What Is your Main Role:</Text>
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
              
            
              <Text>What Is your SoloQ rank:</Text>
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
              <Text>What Is your Flex rank:</Text>

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
     
            

              <Button title="Submit" onPress={apply}/>

              <Text>user: {userId} team: {teamId}</Text>
        </ScrollView>
        )
      }
    

    export default ApplicationFormScreen;