import React, {Component, useState , useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs, doc, DocumentSnapshot } from "firebase/firestore";
import { db } from '../db/firestore.js';
import { authent } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import ImagePickerComp from './ImagepickerComp.js';
import Styles from '../StyleSheets/MyTeamsStyles.js'




function MyTeamsScreen() {

  const navigation = useNavigation();

  const [userId, setUserId] = useState('')
  const [teams, setTeams] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamId, setTeamId] = useState('')


 // const messageRef = doc(db, "rooms", "roomA", "messages", "message1");

 //const q = query(collection(db, "TeamUsers"), where("teamOwnerId", "==", userId));

 useEffect( async () => {
  const getId = await AsyncStorage.getItem('@UserId')
  setUserId(getId);
  
      });

// get User data from firestore
 useEffect(async () => {
  const docRef = doc(db, "Users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
      setTeams(docSnap.get('teams'))
      
    //  console.log("Document data:", docSnap.get('teams'));
    //  console.log("Document data:", docSnap.get('lastName'));
      
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
 })



  
  


 
/*
 useEffect( async () => {
  const q = query(collection(db, "TeamUsers"), where("teamOwnerId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  }); 
 })
*/

const findTeam = async (name) => {
  
  const teams = collection(db, "Teams");
  const q = query(teams, where("name", "==", name));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setTeamId(doc.id)
  setTeamName(doc.get('name'))
  console.log(doc.id, " => ", doc.data());
  

  
  
});


    
}
  

/*
useEffect( async () => {
  const querySnapshot = await getDocs(collection(db, "TeamUsers"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  // const q = query(collection(db, "UserTeams"), where("userId", "==", userId));

 
  console.log(doc.id, " => ", doc.data());
  
  
});
}) */


 // const query1 = query(collection(db, "TeamUsers",), where(, userId))
 // const docRef = doc(db, "Teams", "Users", )


 
 

  
  

        return(
        <View>
            <Text>MyTeamsScreen</Text>
            <Text>{userId}</Text>
            <Button title="View Selected Team" onPress={() => {navigation.navigate('MyTeam', {
              teamId: teamId,
              userId: userId
            })}} />
            <Button title="Create Team" onPress={() => {navigation.navigate("Create a Team")}} />
            

           

            
            
            <Text>Selected Team: {teamName}</Text>
            <Text>Team Id: {teamId}</Text>
            <FlatList
                        data={teams}
                        renderItem={({item}) => (
                          <View>
                            
                           
                            <TouchableOpacity
                              style={Styles.button}
                              onPress={() => findTeam(item)}
                            >
                              <Text>{item}</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        keyExtractor={(item,index) => item.toString()}
            />
            

            
        </View>
        )
      
    }

    export default MyTeamsScreen;