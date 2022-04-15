import React, {Component, useState , useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs, doc, DocumentSnapshot } from "firebase/firestore";
import { db } from '../db/firestore.js';
import { authent } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import ImagePickerComp from './ImagepickerComp.js';
import Styles from '../StyleSheets/MyTeamsStyles.js'
import { Divider } from 'react-native-paper';




function MyTeamsScreen() {

  const navigation = useNavigation();

  const [userId, setUserId] = useState('')
  const [teams, setTeams] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamId, setTeamId] = useState('')

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
 
    } else {

      console.log("No such document!");
    }
 })

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
        return(
        <ScrollView>
          <SafeAreaView style={Styles.selectedTeam}>
            <Text style={Styles.selectedTeamText} >Selected Team: {teamName}</Text>
            <Button title="View Selected Team" onPress={() => {navigation.navigate('MyTeam', {
              teamId: teamId,
              userId: userId
            })}} color="#d90429"/>
          </SafeAreaView>  
            <Divider />
          <SafeAreaView>
            <FlatList
                        data={teams}
                        renderItem={({item}) => (
                          <View>
                            
                           
                            <TouchableOpacity
                              style={Styles.button}
                              onPress={() => findTeam(item)}
                              
                              activeOpacity={0}
                            >
                              <Text style={Styles.teamsText}>{item}</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        keyExtractor={(item,index) => item.toString()}
            />
            </SafeAreaView>  
            <Divider />

            <Button title="Create New Team" onPress={() => {navigation.navigate("Create a Team", {
              userId: userId
            })}} color="#319D05" />
        </ScrollView>
        )
      
    }

    export default MyTeamsScreen;