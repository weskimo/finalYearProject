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

    
    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')

    const [players,setPlayers] = useState([])

    const [playersNames,setPlayersNames] = useState([])

    const[selectedPlayer, setSelectedPlayer] = useState('')


    useEffect(() => {
        const itemId  = route.params.teamId
        const userId = route.params.userId
        setTeamId(itemId)
        setUserId(userId)
      })






    const getPlayers = async () => {
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach( async (doc) => {
          setPlayers(players => [...players, doc.id])
          console.log(doc.id, " => ", doc.data())
        })
    }

    const getPlayersTags =  async() => {
        players.forEach( async (docId) => {
    
          const playerId = docId;
    
          const docRef = doc(db, "Users", docId);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            setPlayersNames(playersNames => [...playersNames, docSnap.get('gamerTag')])
            console.log("Document data:", docSnap.get('gamerTag'));
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
              })
      }


    return (
        <SafeAreaView>
            <Text>Find Players:</Text>
            <Button  title="getPlayers" onPress={getPlayers}/>
            <Button  title="getPlayersList" onPress={getPlayersTags}/>
            <FlatList
              data={playersNames}
              renderItem={({item}) => (
                <View>
                  <Text>{item}</Text>
                  <Button title="SelectPlayer" onPress={() => setSelectedPlayer(players[playersNames.indexOf(item)])} />
                  <Button title="ViewPlayer" onPress={() => {navigation.navigate("Player", {
                    playerId: selectedPlayer
                  })}} />
                </View>
                )}
                keyExtractor={(item,index) => item.toString()}
            />
        </SafeAreaView>
    )


}


export default FindPlayersScreen;