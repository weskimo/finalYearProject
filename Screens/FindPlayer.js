import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { collection, query, where, getDocs, doc, DocumentSnapshot, addDoc } from "firebase/firestore";
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc } from 'firebase/firestore';
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/FoundPlayerStyles.js';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Avatar, Divider } from 'react-native-paper';


function FindPlayerScreen({ route, navigation }) {

    const [selectedProfileImage, setSelectedProfileImage] = useState('');

    const [playerId, setPlayerId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [gamerTag, setGamerTag] = useState('')
    const [bio, setBio] = useState('')
    const [profilePicId, setProfilePicId] = useState('')

     // League of Legends Details
    const [mainRole, setMainRole] = useState('')
    const [mainChamp, setMainChamp] = useState('')
    const [soloQRank, setSoloQRank] = useState('')
    const [flexRank, setFlexRank] = useState('')

    // the person looking at the profile
    const [teamId, setTeamId] = useState('')
    const [viewerId, setViewerId] = useState('')
    const [teamName, setTeamName] = useState('')

    //Teams
    const [teams, setTeams] = useState([])
    const [viewerTeamName, setViewerTeamName] = useState('')


    const storageRef = ref(storage, "Images/" + playerId +".jpg")
    const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/" + playerId +".jpg")


  

    const usersPicRef = ref(storage, playerId + 'ProfilePic.jpg')




    useEffect(() => {
        const playerId = route.params.playerId
        const userId = route.params.userId
       
        setPlayerId(playerId)
        setViewerId(userId)

      })


    
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
      }, [playerId]);
    
    useEffect( async () => {
        const docRef = doc(db, "Users", playerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFirstName(docSnap.get('firstName'))
          setLastName(docSnap.get('lastName'))
          setGamerTag(docSnap.get('gamerTag'))
          setBio(docSnap.get('bio'))
          setTeams(docSnap.get('teams'))
          setMainRole(docSnap.get('mainRole'))
          setFlexRank(docSnap.get('flexRank'))
          setSoloQRank(docSnap.get('soloQRank'))
            
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          
      }, [playerId])

      useEffect(async () => {
        const docRef = doc(db, "Teams", teamId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setViewerTeamName(docSnap.get('name'))
        }
      }, [teamId])


      if(soloQRank !== '') {
      return (
        <ScrollView>
        <SafeAreaView>
            <ScrollView style={Styles.pageContainer}>
          <SafeAreaView style={Styles.profilePicInfoButton}>
              <SafeAreaView style={Styles.profilePicInfo}>
              <Avatar.Image size={110} source={{uri: selectedProfileImage}} />
              </SafeAreaView>
              
             
              <SafeAreaView style={Styles.profileInfo2} >      
                <Text style={Styles.profileInfo}>{gamerTag}</Text>
                <Text style={Styles.profileInfo}>Role: {mainRole}</Text>
              </SafeAreaView>

              
              
            </SafeAreaView>
            <Divider />
            <SafeAreaView style={Styles.bioBox}>
             
             <Text style={Styles.rankText}>Bio:</Text>
             <Text style={Styles.bioText}>Summoner Name: {gamerTag}</Text>
             <Text style={Styles.bioText}>Name: {firstName} {lastName}</Text>
             <Text style={Styles.bioText}>{bio}</Text>
           </SafeAreaView>
            
            <Divider />       
            <SafeAreaView style={Styles.rankInfoBox}>
              <SafeAreaView style={Styles.rankInfo}>
                <Text style={Styles.rankText}>SoloQRank: </Text>
                <Image
                  source={{uri: require("../RankedIcons/Emblem_" + soloQRank + ".png")}}
                  style={Styles.rankIcon}
                />
              </SafeAreaView>
            <SafeAreaView style={Styles.rankInfo}>
            <Text style={Styles.rankText}>FlexRank: </Text>
            <Image
                source={{uri: require("../RankedIcons/Emblem_" + flexRank + ".png")}}
                style={Styles.rankIcon}
              />
              </SafeAreaView>
            </SafeAreaView>
            <Divider />
            <SafeAreaView style={Styles.teamsListBox}>
              <Text style={Styles.rankText}>Teams:</Text>
              <FlatList
                data={teams}
                renderItem={({item}) => (
                  <View>
                   
                  <TouchableOpacity
                              style={Styles.teams}
                              
                              
                              activeOpacity={0}
                            >
                              <Text style={Styles.teamsText} >{item}</Text>
                  </TouchableOpacity>
                  
                  <Divider />
                  </View>
                )}
                keyExtractor={(item,index) => item.toString()}
              />
            </SafeAreaView>
        </ScrollView>

        </SafeAreaView>
        </ScrollView>

      )
                } else {
                  return (
                    <View><Text>Loading...</Text></View>
                  )
                }

}

export default FindPlayerScreen;