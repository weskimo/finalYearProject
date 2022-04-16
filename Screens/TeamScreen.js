import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc, query, where, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Avatar } from 'react-native-paper';
import Styles from '../StyleSheets/TeamScreenStyles'
import { Divider } from 'react-native-paper';


function TeamScreen({ route, navigation }) {


    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')
    const [teamName, setTeamName] = useState('')
    const [teamBio, setTeamBio] = useState('')
    const [teamGame, setTeamGame] = useState('')
    const [teamEmail, setTeamEmail] = useState('')
  
    const [viewPermission, setViewPermission] = useState('nonMember')

    const [selectedProfileImage, setSelectedProfileImage] = useState('');
    const [selectedPlayer,setSelectedPlayer] = useState('')

    const [players, setPlayers] = useState([])
    const [playersNames, setPlayersNames] = useState([])
    const [playerTags, setPlayerTags] = useState([])
  
  
    useEffect(() => {
      const itemId  = route.params.teamId
      const userId = route.params.userId
      setTeamId(itemId)
      setUserId(userId)
    })

    useEffect(async() => {
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
    }, [teamId])

    const storageRef = ref(storage, "Images/Teams/" + teamId + ".jpg")
    const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/Teams/" + teamId +".jpg")
  
    useEffect( async () => { 
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
    }, [teamId])

    useEffect (async () => {
      const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Players"));
      
      querySnapshot.forEach( async (theDoc) => {
        console.log(theDoc.id)
       
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
        }
        } 
      })

    }, [teamId])

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
                teamId:teamId,
                userId: userId
              })}} 
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
            <TouchableOpacity style={Styles.button} onPress={() => setSelectedPlayer(item)}> 
              <Text style={Styles.teamsText}>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item,index) => item.toString()}
      />
      
  </ScrollView>
    )

}

export default TeamScreen;