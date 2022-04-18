import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { db, storage } from '../db/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Styles from '../StyleSheets/EditTeamPictureStyles'



export default function TeamPictures({ route, navigation }) {

    const [selectedUploadImage, setSelectedUploadImage] = useState('');
    const [selectedProfileImage, setSelectedProfileImage] = useState('');
  
    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')
  
    

    useEffect(() => {
        const teamId = route.params.teamId
        setTeamId(teamId)
      })

    const storageRef = ref(storage, "Images/Teams/" + teamId +".jpg")
    const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/Teams/" + teamId +".jpg")


    useEffect(  () => {
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

      const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (pickerResult.cancelled === true) {
            return;
          }
          const img = await fetch(pickerResult.uri)
          const bytes = await img.blob();
    
          await uploadBytes(storageRef, bytes)
          setSelectedUploadImage({ localUri: pickerResult.uri });
        }

      return (
        <ScrollView>
          <SafeAreaView style={Styles.titleBox}>
            <Text style={Styles.title}>Change your teams picture:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.titleBox}>
            <Image
              source={{uri: selectedProfileImage}}
              style={Styles.thumbnail}
              />
              </SafeAreaView>
            
            <TouchableOpacity style={Styles.pickPhoto} onPress={openImagePickerAsync}>
              <Text style={Styles.picPhotoText}>Click here to change Image</Text>
            </TouchableOpacity>
          
        </ScrollView>
      )
    
}


