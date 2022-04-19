import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc, query, where, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import FindPlayersScreen from './FindPlayersScreen';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db , storage } from '../db/firestore.js';
import Styles from '../StyleSheets/MyTeamStyles'
import { Divider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';


export default function MyTeamScreen({ route, navigation }) {

  // check if screen is focused
  const isFocused = useIsFocused();

  const [selectedProfileImage, setSelectedProfileImage] = useState('');
  const [selectedPlayer,setSelectedPlayer] = useState('')



  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamBio, setTeamBio] = useState('')


  const [teamEvents, setTeamEvents] = useState([])
  const [teamEventInfo, setTeamEventInfo] = useState([])

  const [players, setPlayers] = useState([])
  const [playersNames, setPlayersNames] = useState([])
  const [playerTags, setPlayerTags] = useState([])

  const [viewPermission, setViewPermission] = useState('')

  useEffect(() => {
    const userId = route.params.userId
    const teamIdd  = route.params.teamId
    setTeamId(teamIdd)
    setUserId(userId)
    console.log(userId + "fireant")
  }, )

  useEffect( async () => {
    isFocused;
    const docRef = doc(db, "Teams", teamId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setTeamName(docSnap.get('name'))
        
        setTeamBio(docSnap.get('bio'))
        
        console.log("Document data:", docSnap.get('name'));
        console.log("Document data:", docSnap.get('game'));
        
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      } 
  }, [teamId, isFocused])



  useEffect( async () => {
    isFocused
    const teams = collection(db, "Teams", teamId, "Players");
    const q = query(teams, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (theDoc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(theDoc.id)
    const docRef = doc(db, "Teams", teamId, "Players", theDoc.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if(docSnap.get('admin') == "Yes") {
        setViewPermission('admin')
        console.log('admin')
      } else if (docSnap.get('admin') == 'no') {
        setViewPermission('player')
        console.log('player')
      } else {
        setViewPermission('non')
      }
    }
    
  
  
})
  }, [teamId, isFocused])

  const storageRef = ref(storage, "Images/Teams/" + teamId + ".jpg")
  const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/Teams/" + teamId +".jpg")

  useEffect( async () => { 
    isFocused;
    getDownloadURL(down)
      .then((url) => {
        setSelectedProfileImage(url);
        console.log(url)
        console.log(selectedProfileImage)
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
  
          // ...
  
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }, [teamId, isFocused])

  useEffect( async () => {
    isFocused
    const listEvents = []
    const listInfo = []
    const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Events"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
      listEvents.push(doc.get('eventName'))
      listInfo.push(doc.get('eventInfo'))
  });
  setTeamEvents(listEvents)
  setTeamEventInfo(listInfo)
    
  },[teamId, isFocused] )

  useEffect (async () => {
    isFocused

    const listPlayersTags = []
    const listPlayersId = []
    const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Players"));
    
    querySnapshot.forEach( async (theDoc) => {

      
      if(players.includes(theDoc.id)) {
        console.log("dub")
      } else {
      const docRef = doc(db, "Teams", teamId, "Players", theDoc.id);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
      console.log(docSnap.get('userId'))
      const docRef2 = doc(db, "Users", docSnap.get('userId'));
      const docSnap2 = await getDoc(docRef2)

      if(!players.includes(theDoc.id)) {
        setPlayers(players => [...players, theDoc.id])
        setPlayersNames(playersNames => [...playersNames, docSnap.get('userId')])
        setPlayerTags(playerTags => [...playerTags, docSnap2.get('gamerTag') ])
        console.log(theDoc.id, " => ", theDoc.data())
        
      }  else {
      console.log("duplicate")
      }
    }}
  })

  
}, [teamName, isFocused])

  const getPic =  async () => {
    console.log(teamId)
    getDownloadURL(down)
      .then((url) => {
        setSelectedProfileImage(url);
        console.log(url)
        console.log(selectedProfileImage)
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
  
          // ...
  
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }

  

  const getData = async () => {
    const docRef = doc(db, "Teams", teamId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setTeamName(docSnap.get('name'))
        
        setTeamBio(docSnap.get('bio'))
        
        console.log("Document data:", docSnap.get('name'));
        console.log("Document data:", docSnap.get('game'));
        
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      } 
}



const getPermission = async () => {
  const teams = collection(db, "Teams", teamId, "Players");
  const q = query(teams, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  if(doc.get('admin') == "Yes") {
    setViewPermission('admin')
  }  

  console.log(doc.id, " => ", doc.data());
  
  
})
    
}

const findPlayer = async (name) => {
  console.log(name)
  const thePlayerId = playersNames[playerTags.indexOf(name)]
  console.log(thePlayerId)
  const docRef = doc(db, "Users", thePlayerId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) { 
    navigation.navigate("Player Profile", {
      playerId: docSnap.id
    })
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    } 
}
   






if(viewPermission == 'admin') {

  return (
        
        <ScrollView>
            <SafeAreaView>
              <SafeAreaView style={Styles.profileHeaderBox}>
                <SafeAreaView style={Styles.picBox}>
                  <Image
                    source={{uri: selectedProfileImage}}
                    style={Styles.thumbnail}
                  />
                </SafeAreaView>
                <SafeAreaView style={Styles.buttonBox}>
                  <Button title="Find Players" onPress={() => {navigation.navigate("FindPlayers", {
                    teamId: teamId,
                    userId: userId
                  })}} color="#d90429"/>

                  <Button title="Manage Applications" onPress={() => {navigation.navigate("ManageApplications", {
                    teamId: teamId,
                    userId: userId
                  })}} color="#d90429"/>

                  <Button title="Edit Team Details" onPress={() => {navigation.navigate("EditTeam", {
                    teamId: teamId,
                  })}} color="#d90429"/>
                </SafeAreaView>

              </SafeAreaView>
            </SafeAreaView>
            <Divider />
            <SafeAreaView>
              <SafeAreaView style={Styles.nameBox}>
              
              <Text style={Styles.teamName}>{teamName}</Text>
              </SafeAreaView>
              <Text style={Styles.bioTitle}>Bio:</Text>
              <Text  style={Styles.bioText}>{teamBio}</Text>
            </SafeAreaView>
            <Divider />
            <TouchableOpacity style={Styles.eventsOpa} > 
              <Text style={Styles.titleOpaText}>Events:</Text>
            </TouchableOpacity>
            <FlatList
              data={teamEvents}
              renderItem={({item}) => (
                <SafeAreaView style={Styles.eventBox}>
                  <TouchableOpacity>
                    <Text style={Styles.eventInfoTitle}>Event Name: {item}</Text>
                    <Text style={Styles.eventInfoTitle}>Event Info:</Text>
                    <Text style={Styles.eventInfo}>{teamEventInfo[teamEvents.indexOf(item)]}</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              )}
              keyExtractor={(item,index) => item.toString()}
            />
            
            <TouchableOpacity style={Styles.eventsOpa} > 
              <Text style={Styles.titleOpaText}>Players:</Text>
            </TouchableOpacity>
            <FlatList
              data={playerTags}
              renderItem={({item}) => (
                <View> 
                  <TouchableOpacity style={Styles.button} onPress={() => findPlayer(item)}> 
                    <Text style={Styles.teamsText}>{item}</Text>
                  </TouchableOpacity>
                 
                  
                </View>
                )}
                keyExtractor={(item,index) => item}
            />
        </ScrollView>
  )
          } else if (viewPermission == "player") {
            return (
              <ScrollView>
              <SafeAreaView>
                <SafeAreaView style={Styles.profileHeaderBox}>
                  <SafeAreaView style={Styles.picBox}>
                    <Image
                      source={{uri: selectedProfileImage}}
                      style={Styles.thumbnail}
                    />
                  </SafeAreaView>
                  
  
                </SafeAreaView>
              </SafeAreaView>
              <Divider />
              <SafeAreaView>
                <SafeAreaView style={Styles.nameBox}>
                
                <Text style={Styles.teamName}>{teamName}</Text>
                </SafeAreaView>
                <Text style={Styles.bioTitle}>Bio:</Text>
                <Text  style={Styles.bioText}>{teamBio}</Text>
              </SafeAreaView>
              <Divider />
              <FlatList
              data={teamEvents}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity style={Styles.button}>
                    <Text style={Styles.teamsText}>{item}</Text>
                    <Text style={Styles.teamsText}>{teamEventInfo[teamEvents.indexOf(item)]}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item,index) => item.toString()}
            />
            <Text style={Styles.bioTitle}>Players:</Text>
            <FlatList
              data={playerTags}
              renderItem={({item}) => (
                <View> 
                  <TouchableOpacity style={Styles.button} onPress={() => findPlayer(item)}> 
                    <Text style={Styles.teamsText}>{item}</Text>
                  </TouchableOpacity>
                 
                  
                </View>
                )}
                keyExtractor={(item,index) => item}
            />
          </ScrollView>

            )
          } else {
            return (
            <ScrollView>
            <SafeAreaView>
              <SafeAreaView style={Styles.profileHeaderBox}>
                <SafeAreaView style={Styles.picBox}>
                  <Image
                    source={{uri: selectedProfileImage}}
                    style={Styles.thumbnail}
                  />
                </SafeAreaView>
                <SafeAreaView style={Styles.buttonBox}>
                  <Button 
                    title="Apply Here!" 
                    onPress={() => {navigation.navigate('Apply', {
                      teamId: teamId,
                      userId: userId
                    })}} 
                    color="#d90429"
                  />
                </SafeAreaView>
      
              </SafeAreaView>
            </SafeAreaView>
            <Divider />
            <SafeAreaView>
              <SafeAreaView style={Styles.nameBox}>
              
              <Text style={Styles.teamName}>{teamName}</Text>
              </SafeAreaView>
              <Text style={Styles.bioTitle}>Bio:</Text>
              <Text  style={Styles.bioText}>{teamBio}</Text>
            </SafeAreaView>
            <Divider />
            <Text style={Styles.bioTitle} >Players:</Text>
            <FlatList
                    data={playerTags}
                    renderItem={({item}) => (
                      <View> 
                        <TouchableOpacity style={Styles.button} onPress={() => findPlayer(item)}> 
                          <Text style={Styles.teamsText}>{item}</Text>
                        </TouchableOpacity>
                       
                        
                      </View>
                      )}
                      keyExtractor={(item,index) => item}
                  />
            
        </ScrollView>
            )
          }
      }
     