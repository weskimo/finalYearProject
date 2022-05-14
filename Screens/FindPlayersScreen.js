import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
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
import Styles from '../StyleSheets/FindPlayerStyles'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, doc, query, where, getDocs} from 'firebase/firestore';
import { Divider, List, Searchbar } from 'react-native-paper';






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

    //search by rank or role
    const [soloQRank, setSoloQRank] = useState('Gold')
    const [flexRank, setFlexRank] = useState('Gold')
    const [playerRole, setPlayerRole] = useState('Mid')

    const [searchName, setSearchName] = useState('');
    const onChangeSearch = query1 => setGamerTag(query1);


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

    const findPlayerByRole = async () => {
      setPlayers([])
      setPlayersNames([])
      const users = collection(db, "Users");
      const q = query(users, where("mainRole", "==", playerRole));
    
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach( async (theDoc) => {

        const docRef = doc(db, "Users", theDoc.id);
        const docSnap = await getDoc(docRef)
      // doc.data() is never undefined for query doc snapshots
      if (docSnap.exists()) {
        console.log(docSnap.get('playerRole'))

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
  const findPlayerBySolo = async () => {
     
    setPlayers([])
    setPlayersNames([])
    const users = collection(db, "Users");
    const q = query(users, where("soloQRank", "==", soloQRank));
  
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

const findPlayerByFlex = async () => {
  setPlayers([])
  setPlayersNames([]) 
  const users = collection(db, "Users");
  const q = query(users, where("flexRank", "==", flexRank));

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
      <ScrollView>
        <SafeAreaView>
            <SafeAreaView >
            <SafeAreaView>
              <Searchbar
                  placeholder="Search by Summoner Name..."
                  onChangeText={onChangeSearch}
                  value={gamerTag}
                  maxLength={16}
                />
              <Button title="Search" onPress={findPlayerName} color="#d90429"/>
              </SafeAreaView>
              <SafeAreaView>
                <List.Section title="Select Role to Search For:">
                  <List.Accordion
                    title="Role"
                    left={props => <List.Icon  icon={{uri: require("../RankedRoles/" +  playerRole + ".png")}}/>}
                  >
                    <List.Item title="Top" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Top.png")}} />} onPress={() => {setPlayerRole("Top")}}/>
                    <List.Item title="Jungle" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Jungle.png")}} />} onPress={() => {setPlayerRole("Jungle")}}/>
                    <List.Item title="Mid" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Mid.png")}} />} onPress={() => {setPlayerRole("Mid")}}/>
                    <List.Item title="Bot" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Bot.png")}} />} onPress={() => {setPlayerRole("Bot")}}/>
                    <List.Item title="Support" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Support.png")}} />} onPress={() => {setPlayerRole("Support")}}/>
                  </List.Accordion>
                </List.Section>

                <Button title="Search Role" onPress={findPlayerByRole} color="#d90429"/>
              </SafeAreaView>
              
              </SafeAreaView>
              <Divider />
              <SafeAreaView style={Styles.lists}>
              <List.Section title="Select SoloRank to Search For:">
                    <List.Accordion
                      title="Solo Queue"
                      left={props => <List.Icon icon={{uri: require("../RankedIcons/Emblem_" +  soloQRank + ".png")}}/>}
                      >
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setSoloQRank("Challenger")}} />
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setSoloQRank("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setSoloQRank("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />} onPress={() => {setSoloQRank("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setSoloQRank("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setSoloQRank("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setSoloQRank("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />}  onPress={() => {setSoloQRank("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />} onPress={() => {setSoloQRank("Challenger")}} />
                    </List.Accordion>
              </List.Section>      
              <List.Section title="Select FlexRank to Search For:">
                    <List.Accordion
                      title="Flex Queue"
                      left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_" +  flexRank + ".png")}}/>}
                      >
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setFlexRank("Challenger")}}/>
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setFlexRank("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setFlexRank("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />}  onPress={() => {setFlexRank("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setFlexRank("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setFlexRank("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setFlexRank("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />} onPress={() => {setFlexRank("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />}  onPress={() => {setFlexRank("Iron")}} />
                    </List.Accordion>
                  </List.Section>
                  </SafeAreaView>
                  <SafeAreaView style={Styles.searchButtons}>
                    
                    <Button title="Search Solo Rank" onPress={findPlayerBySolo} color="#d90429"/>
                    <Button title="Search Flex Rank" onPress={findPlayerByFlex} color="#d90429"/>
                  </SafeAreaView>
                  <Divider />
                  <SafeAreaView style={Styles.titleBox}>
                    <Text style={Styles.foundPlayersText}>Found Players:</Text>
                  </SafeAreaView>
                  <FlatList
                    data={players}
                    renderItem={({item}) => (
                      <View>
                        <TouchableOpacity style={Styles.button} onPress={() => {navigation.navigate('Player', {
                            playerId: item,
                            userId: userId,
                            teamId: teamId
                            
                            })}}>
                          <Text style={Styles.playerNamesText}>{playersNames[players.indexOf(item)]}</Text>
                        </TouchableOpacity>
                      </View>
                      )}
                      keyExtractor={(item,index) => item.toString()}
                  />
        </SafeAreaView>
        </ScrollView>
    )


}


export default FindPlayersScreen;