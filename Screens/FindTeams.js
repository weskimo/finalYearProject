import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import MakeNewTeamScreen from './MakeNewTeamScreen';
import MyTeamsScreen from './MyTeamsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc, query, where, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, addDoc } from 'firebase/firestore';
import { List } from 'react-native-paper';
import Styles from '../StyleSheets/FindTeamStyles'
import { Searchbar } from 'react-native-paper';




function FindTeamsScreen({ route, navigation }) {


  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')

  const [selectedTeam, setSelectedTeam] = useState('')
 
  const [teams, setTeams] = useState([])
  const [teamNames, setTeamNames] = useState([])


  const [tag, setNewTag] = useState('Mid')

  const [searchTag, setSearchTag] = useState('')



  const [searchName, setSearchName] = useState('');
  const onChangeSearch = query1 => setSearchName(query1);

  useEffect( async () => {
    const getId = await AsyncStorage.getItem('@UserId')
    setUserId(getId)
        });

  // gets the ID of every team and puts them in a list.
  const getTeams = async () => {
    const querySnapshot = await getDocs(collection(db, "Teams"));
    querySnapshot.forEach( async (doc) => {
      setTeams(teams => [...teams, doc.id])
      console.log(doc.id, " => ", doc.data())
    })
  }

  const getTeamNamesList = async(listTags) => {
    
    listTags.forEach( async (docId) => {

      const teamId = docId;
      const docRef = doc(db, "Teams", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTeamNames(teamNames => [...teamNames, docSnap.get('name')])
        console.log("Document data:", docSnap.get('name'));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
          })
          
  }

  const searchByName = async () => {
    
    const listTag = []
    setTeamNames([])
    setTeams([])
    
    const q = query(collection(db, "Teams"), where("name", "==", searchName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      
      listTag.push(doc.id)
      setTeams(teams => [...teams, doc.id])
      console.log(doc.id, " => ", doc.data());
      
    })
    listTag.forEach( async (docId) => {

      const teamId = docId;
      const docRef = doc(db, "Teams", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTeamNames(teamNames => [...teamNames, docSnap.get('name')])
        console.log("Document data:", docSnap.get('name'));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
          })
    setSearchName('')
    
  
  }

  const getTeamsTag = async () => {
    const listTag = []
    setTeamNames([])
    setTeams([])
    const q = query(collection(db, "Teams"), where("tags", "array-contains", tag));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      listTag.push(doc.id)
      setTeams(teams => [...teams, doc.id])
      console.log(doc.id, " => ", doc.data());
      
    })
    listTag.forEach( async (docId) => {

      const teamId = docId;
      const docRef = doc(db, "Teams", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTeamNames(teamNames => [...teamNames, docSnap.get('name')])
        console.log("Document data:", docSnap.get('name'));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
          })
  }

  return (
        
        <ScrollView>
          <SafeAreaView>
            
            <SafeAreaView>

            <SafeAreaView>  
                
                <Searchbar
                  placeholder="Search"
                  onChangeText={onChangeSearch}
                  value={searchName}
                />
                <Button title="Search for Name" onPress={searchByName} color="#d90429"/>
              </SafeAreaView>
              <SafeAreaView> 
                <List.Section title="Select A Tag:">
                    <List.Accordion
                      title="Role/Rank Tag:"
                      left={props => <List.Icon  icon={{uri: require("../RankedRoles/" +  tag + ".png")}}/>}
                    >
                      <List.Item title="Top" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Top.png")}} />} onPress={() => {setNewTag("Top")}}/>
                      <List.Item title="Jungle" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Jungle.png")}} />} onPress={() => {setNewTag("Jungle")}}/>
                      <List.Item title="Mid" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Mid.png")}} />} onPress={() => {setNewTag("Mid")}}/>
                      <List.Item title="Bot" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Bot.png")}} />} onPress={() => {setNewTag("Bot")}}/>
                      <List.Item title="Support" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Support.png")}} />} onPress={() => {setNewTag("Support")}}/>
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Challenger.png")}} />} onPress={() => {setNewTag("Challenger")}} />
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Grandmaster.png")}} />} onPress={() => {setNewTag("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Master.png")}} />} onPress={() => {setNewTag("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Diamond.png")}} />} onPress={() => {setNewTag("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Platinum.png")}} />}  onPress={() => {setNewTag("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Gold.png")}} />}  onPress={() => {setNewTag("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Silver.png")}} />}  onPress={() => {setNewTag("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Bronze.png")}} />}  onPress={() => {setNewTag("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Iron.png")}} />} onPress={() => {setNewTag("Iron")}} />
                    </List.Accordion>
                  </List.Section>
                  
                  <Text style={Styles.titleText}>Selected Tag: {tag}</Text>
                  <Button title="Search By Tag" onPress={getTeamsTag} color="#d90429"/>
              </SafeAreaView>

              
            </SafeAreaView>


            <SafeAreaView>
              
            </SafeAreaView>
            <SafeAreaView>
            <FlatList
              data={teams}
              renderItem={({item}) => (
                <SafeAreaView>
                  <TouchableOpacity style={Styles.teamsItem} onPress={() =>  {navigation.navigate("TeamScreen", {
                          userId: userId,
                          teamId: item
                        })}} >
                    <Text style={Styles.teamsText}>{teamNames[teams.indexOf(item)]}</Text>
                  </TouchableOpacity>
                </SafeAreaView>
                )}
                keyExtractor={(item,index) => item.toString()}
            />
            </SafeAreaView>
          </SafeAreaView>
        </ScrollView>
  )
          
      }
    

    export default FindTeamsScreen;

    // onPress={() => setSelectedTeam(teams[teamNames.indexOf(item)])}