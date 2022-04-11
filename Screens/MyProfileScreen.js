import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, ScrollView, FlatList} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc } from 'firebase/firestore';
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/MyProfileStyles.js';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import * as ImagePicker from 'expo-image-picker';

function MyProfileScreen({ route, navigation }) {


  // image ref
 
  const [selectedProfileImage, setSelectedProfileImage] = useState('');

  const [id, setId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePicId, setProfilePicId] = useState('')
  const [gamerTag, setGamerTag] = useState('')
  const [bio, setBio] = useState('')
  const storageRef = ref(storage, "Images/" + id +".jpg")
  const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/" + id +".jpg")

   // League of Legends Details
   const [mainRole, setMainRole] = useState('')
   const [mainChamp, setMainChamp] = useState('')
   const [soloQRank, setSoloQRank] = useState('')
   const [flexRank, setFlexRank] = useState('')

  //Teams
  const [teams, setTeams] = useState([])

  

  const auth = getAuth();
  const user = auth.currentUser;

  const usersPicRef = ref(storage, id + 'ProfilePic.jpg')
  
  
  const getAsync = async () => {
      const getId = await AsyncStorage.getItem('@UserId')
      setId(getId);
  }

  useEffect(() => {
    const userId = route.params.userId
    setId(userId)
    console.log(userId + "fireant")
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
  });

  useEffect( async () => {
    const docRef = doc(db, "Users", id);
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

        
        console.log("Document data:", docSnap.get('firstName'));
        console.log("Document data:", docSnap.get('lastName'));
        
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
  })

  const getData = async () => {
        const docRef = doc(db, "Users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setFirstName(docSnap.get('firstName'))
            setLastName(docSnap.get('lastName'))
            
            console.log("Document data:", docSnap.get('firstName'));
            console.log("Document data:", docSnap.get('lastName'));
            
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        
    }

    const getDownloadImage = async () => {  // Get the download URL
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
    } 
      if(soloQRank !== '') {
        return(

        <ScrollView style={Styles.pageContainer}>
          <SafeAreaView style={Styles.profilePicInfoButton}>
              <SafeAreaView style={Styles.profilePicInfo}>
              <Image
                source={{uri: selectedProfileImage}}
                style={Styles.thumbnail}
              />
             
              <SafeAreaView >
                <Text style={Styles.profileInfo}>{gamerTag}</Text>
                <Text style={Styles.profileInfo}>{firstName} {lastName}</Text>
                <Text style={Styles.profileInfo}>Main Role: {mainRole}</Text>
              </SafeAreaView>
              </SafeAreaView>
              <SafeAreaView>
                  <Button title="EditProfile" 
                    onPress={() => {navigation.navigate("EditProfile", {
                      userId: id,
                      bio: bio,
                      firstName: firstName,
                      lastName: lastName,
                      gamerTag: gamerTag,
                    })}} 
                    color="#d90429"/>
              </SafeAreaView>
            </SafeAreaView>
            
            <SafeAreaView style={Styles.rankInfoBox}>
              <SafeAreaView style={Styles.rankInfo}>
              <Text>SoloQRank: </Text>
              <Image
                source={{uri: require("../RankedIcons/Emblem_" + soloQRank + ".png")}}
                style={Styles.rankIcon}
              />
            </SafeAreaView>
            <SafeAreaView style={Styles.rankInfo}>
            <Text>FlexRank: </Text>
            <Image
                source={{uri: require("../RankedIcons/Emblem_" + flexRank + ".png")}}
                style={Styles.rankIcon}
              />
              </SafeAreaView>
            </SafeAreaView>

            <SafeAreaView style={Styles.bioBox}>
              <Text>User Id: {id}</Text>
              <Text>Bio: {bio}</Text>
            </SafeAreaView>

            <SafeAreaView style={Styles.teamsListBox}>
              <FlatList
                data={teams}
                renderItem={({item}) => (
                  <View>
                    <Text>{item}</Text>
                    
                  </View>
                )}
                keyExtractor={(item,index) => item.toString()}
              />
            </SafeAreaView>
            
        

          
        </ScrollView>
        )
          } else {
            return (
              <View> <Text>Loading</Text></View>
            )
          }
      
    }

    export default MyProfileScreen; 