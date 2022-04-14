import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
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




function FindTeamsScreen({ route, navigation }) {


  const [userId, setUserId] = useState('')
  const [teamId, setTeamId] = useState('')

  const [selectedTeam, setSelectedTeam] = useState('')
 
  const [teams, setTeams] = useState([])
  const [teamNames, setTeamNames] = useState([])


  const [tag, setNewTag] = useState('Mid')

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

  const getTeamsTag = async () => {
    const listTag = []
    setTeamNames([])
    const q = query(collection(db, "Teams"), where("tags", "array-contains", tag));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      listTag.push(doc.id)
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
        
        <View>
            <Text>FindTeams:</Text>
           
            <Button title="SearchTag" onPress={getTeamsTag} />
            <Text>Tag to search for: {tag}</Text>
            <Text>Add a Tag to search for:</Text>
            <List.Section title="Select Tag:">
                <List.Accordion
                  title="Tag (Add rank or role you are applying for)"
                  left={props => <List.Icon  icon={{uri: require("../RankedRoles/Position_Challenger-" +  tag + ".png")}}/>}
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
            <FlatList
              data={teamNames}
              renderItem={({item}) => (
                <View>
                  <Text>{item}</Text>
                  <Button title="SelectTeam" onPress={() => setSelectedTeam(teams[teamNames.indexOf(item)])} />
                  <Button title="ViewTeam" onPress={() => {navigation.navigate("TeamScreen", {
                    userId: userId,
                    teamId: selectedTeam
                  })}} />
                </View>
                )}
                keyExtractor={(item,index) => item.toString()}
            />
        </View>
  )
          
      }
    

    export default FindTeamsScreen;