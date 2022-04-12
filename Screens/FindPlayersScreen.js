import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, FlatList} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, addDoc} from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/MyProfileStyles.js';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc, query, where, getDocs} from 'firebase/firestore';




function FindPlayersScreen({ route, navigation }) {

    // navi props
    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')

    //players arrays
    const [players,setPlayers] = useState([])
    const [playersNames,setPlayersNames] = useState([])

    // selected player for navi
    const[selectedPlayer, setSelectedPlayer] = useState('')

    // gamerTag to search for
    const [gamerTag, setGamerTag] = useState('')


    useEffect(() => {
        const itemId  = route.params.teamId
        const userId = route.params.userId
        setTeamId(itemId)
        setUserId(userId)
      })


      // setTags(players => [...players, doc.data()])
      const findPlayerName = async () => {
        setPlayers([])
        setPlayersNames([])
        const teams = collection(db, "Users");
        const q = query(teams, where("gamerTag", "==", gamerTag));
      
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach( async (theDoc) => {

          const docRef = doc(db, "Users", theDoc.id);
          const docSnap = await getDoc(docRef)
        // doc.data() is never undefined for query doc snapshots
        if (docSnap.exists()) {
          console.log(docSnap.get('gamerTag'))

          if(players.includes(theDoc.id)) {
            console.log("dubplicate")
          }  else {
          setPlayers(players => [...players, theDoc.id])
          setPlayersNames(playersNames => [...playersNames, docSnap.get('gamerTag')])
          console.log(theDoc.id, " => ", theDoc.data())
          }
        }
      
        
        
      });  
    }


/*      const docRef = doc(db, "Users", id);
        const docSnap = await getDoc(docRef); */


    const getPlayers = async () => {
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach( async (theDoc) => {
          const docRef = doc(db, "Users", theDoc.id);
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
          console.log(docSnap.get('gamerTag'))

          if(players.includes(theDoc.id)) {
            console.log("dubplicate")
          }  else {
          setPlayers(players => [...players, theDoc.id])
          setPlayersNames(playersNames => [...playersNames, docSnap.get('gamerTag')])
          console.log(theDoc.id, " => ", theDoc.data())
          }
        }
        })
      
    }

    

    return (
        <SafeAreaView>
            <Text>Find Players:</Text>
            <TextInput
              placeholder='Search for player by Gamer Tag...'
              value={gamerTag}
              onChangeText={text => setGamerTag(text)}
            />
            <Button title="Search" onPress={findPlayerName}/>
            <Button  title="getPlayers" onPress={getPlayers}/>
            
            
            <FlatList
              data={playersNames}
              renderItem={({item}) => (
                <View>
                  <Text>{item}</Text>
                  
                </View>
                )}
                keyExtractor={(item,index) => item.toString()}
            />
        </SafeAreaView>
    )


}


export default FindPlayersScreen;