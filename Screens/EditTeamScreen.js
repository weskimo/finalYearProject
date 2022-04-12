import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, ScrollView, FlatList} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, FieldValue } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, getDocs} from 'firebase/firestore';
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/MyProfileStyles.js';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { List } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


function EditTeamScreen ({ route, navigation }) {
    // id
    const [teamId, setTeamId] = useState('')

    // basic info
    const [teamName, setTeamName] = useState('')
    const [teamBio, setTeamBio] = useState('')
    const [teamEmail, setTeamEmail] = useState('')

    const [oldName, setOldName] = useState('')

    // lists
    const [newTag, setNewTag] = useState('Mid')
    const [teamTags, setTeamTags] = useState([])
    const [players, setPlayers] = useState([])
    const [playersNames, setPlayersNames] = useState([])







    useEffect(() => {
        const itemId  = route.params.teamId
        setTeamId(itemId)
      })

      useEffect( async () => {
        const docRef = doc(db, "Teams", teamId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setTeamName(docSnap.get('name'))
            setTeamEmail(docSnap.get('email'))
            setTeamBio(docSnap.get('bio'))
            
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          
      }, [teamId]) 

      useEffect(async () => {
        const docRef = doc(db, "Teams", teamId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setOldName(docSnap.get('name'))
      }}, [teamId])
      
      

      useEffect( async () => {
        const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Players"));
        querySnapshot.forEach( async (theDoc) => {
          const docRef = doc(db, "Teams", teamId, "Players", theDoc.id);
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
          console.log(docSnap.get('userId'))

          if(players.includes(theDoc.id)) {
            console.log("dubplicate")
          }  else {
          setPlayers(players => [...players, theDoc.id])
          setPlayersNames(playersNames => [...playersNames, docSnap.get('userId')])
          console.log(theDoc.id, " => ", theDoc.data())
          }
        }
        })
      
    }, [teamId])


    const saveTeamDetails = async () => {

      console.log(oldName)
      console.log(teamName)
      const teamRef = doc(db, 'Teams', teamId);
      setDoc(teamRef, 
        { 
          name: teamName,
          bio: teamBio,
          email: teamEmail
        }, { merge: true })
        .then(() => {
          players.forEach( async (player) => {
            console.log(player)
            const playerIdRef = doc(db, "Teams", teamId, "Players", player)
            const docSnap = await getDoc(playerIdRef)
            const playerId = docSnap.get('userId')
            const userProfile = doc(db, "Users", playerId);
            await updateDoc(userProfile, {
                teams: arrayUnion(teamName)
            })
            await updateDoc(userProfile, {
              teams: arrayRemove(oldName)
           });
            
          })
        })
        
    }

    const saveTeamTags = async () => {
      const teamProfile = doc(db, "Teams", teamId);
      await updateDoc(teamProfile, {
          tags: arrayUnion(newTag)
      })
    }

        return(
        <ScrollView>
            <Text>EditTeamScreen</Text>
            <Text>Your Teams Details</Text>
            <Text>Change Team Name to:</Text>
            <TextInput
              placeholder='Change Team Name To...'
              value={teamName}
              onChangeText={text => setTeamName(text)}
            />
            <Text>Change Team Bio to:</Text>
            <TextInput
              placeholder='Change Team Bio To...'
              value={teamBio}
              onChangeText={text => setTeamBio(text)}
            />
            <Text>Change Team Email to:</Text>
            <TextInput
              placeholder='Change Team Email To...'
              value={teamEmail}
              onChangeText={text => setTeamEmail(text)}
            />
            <Button title="Confirm Team Details" onPress={saveTeamDetails} color="#d90429"/>
            <Text>Add a Tag (roles or ranks you are recruiting):</Text>
            <List.Section title="Select Tag:">
                <List.Accordion
                  title="Tag (Add ranks and roles you are recruiting)"
                  left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-" +  newTag + ".png")}}/>}
                >
                  <List.Item title="Top" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Top.png")}} />} onPress={() => {setNewTag("Top")}}/>
                  <List.Item title="Jungle" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Jungle.png")}} />} onPress={() => {setNewTag("Jungle")}}/>
                  <List.Item title="Mid" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Mid.png")}} />} onPress={() => {setNewTag("Mid")}}/>
                  <List.Item title="Bot" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Bot.png")}} />} onPress={() => {setNewTag("Bot")}}/>
                  <List.Item title="Support" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-Support.png")}} />} onPress={() => {setNewTag("Support")}}/>
                  <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setNewTag("Challenger")}} />
                  <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setNewTag("Grandmaster")}} />
                  <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setNewTag("Master")}} />
                  <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />} onPress={() => {setNewTag("Diamond")}} />
                  <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setNewTag("Platinum")}} />
                  <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setNewTag("Gold")}} />
                  <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setNewTag("Silver")}} />
                  <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />}  onPress={() => {setNewTag("Bronze")}} />
                  <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />} onPress={() => {setNewTag("Iron")}} />
                </List.Accordion>
              </List.Section>
            
            <Button title="Add Tag" onPress={saveTeamTags} color="#d90429" />

            <Button title="Change Team Picture" onPress={() => {navigation.navigate("TeamPicture", {
              teamId: teamId,
            })}} color="#d90429" />


            <FlatList
              data={playersNames}
              renderItem={({item}) => (
                <View>
                  <Text>{item}</Text>
                  
                </View>
                )}
                keyExtractor={(item,index) => item.toString()}
            />
            
            
        </ScrollView>
        )
      
    }

export default EditTeamScreen;