import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image} from 'react-native';
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


function PlayerScreen({ route, navigation }) {

    const [selectedProfileImage, setSelectedProfileImage] = useState('');

    const [playerId, setPlayerId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profilePicId, setProfilePicId] = useState('')


    const storageRef = ref(storage, "Images/" + playerId +".jpg")
    const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/" + playerId +".jpg")


  

    const usersPicRef = ref(storage, playerId + 'ProfilePic.jpg')




    useEffect(() => {
        const userId = route.params.playerId
        setPlayerId(userId)
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
        const docRef = doc(db, "Users", playerId);
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
          
      })


      return (
        <SafeAreaView>
            <Text> {playerId} </Text>
            <Text>{firstName}</Text>
            <Image
              source={{uri: selectedProfileImage}}
              style={Styles.thumbnail}
            />

        </SafeAreaView>

      )


}

export default PlayerScreen;