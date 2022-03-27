import React, {Component, useState , useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs, doc, DocumentSnapshot } from "firebase/firestore";
import { db } from '../db/firestore.js';
import { authent } from '../db/firestore.js';
import firebase from 'firebase/compat';




function MyTeamsScreen() {

  const navigation = useNavigation();

  const [userId, setUserId] = useState('')
  const [teams, setTeams] = useState('')

 // const messageRef = doc(db, "rooms", "roomA", "messages", "message1");

 //const q = query(collection(db, "TeamUsers"), where("teamOwnerId", "==", userId));

 useEffect( async () => {
  const getId = await AsyncStorage.getItem('@UserId')
  setUserId(getId)
      });

 

 useEffect(async () => {
  const q = query(collection(db, "TeamUsers"), where("teamOwnerId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  }); 
 })
  


useEffect( async () => {
  const querySnapshot = await getDocs(collection(db, "TeamUsers"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  // const q = query(collection(db, "UserTeams"), where("userId", "==", userId));

 
  console.log(doc.id, " => ", doc.data());
  
  
});
}) 


 // const query1 = query(collection(db, "TeamUsers",), where(, userId))
 // const docRef = doc(db, "Teams", "Users", )

 

  
  

        return(
        <View>
          <Text>{userId}</Text>
            <Text>MyTeamsScreen</Text>
            <Button title="MyTeam" onPress={() => {navigation.navigate('MyTeam')}} />
            <Button title="Create Team" onPress={() => {navigation.navigate("Create a Team")}} />
            
            
        </View>
        )
      
    }

    export default MyTeamsScreen;