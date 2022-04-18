import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { db, storage } from '../db/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Avatar, Divider } from 'react-native-paper';
import Styles from '../StyleSheets/changePPStyles'


export default function ImagePickerComp({ route, navigation }) {


  const [selectedUploadImage, setSelectedUploadImage] = useState('');
    const [selectedProfileImage, setSelectedProfileImage] = useState('');
  
    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')
  
    

    useEffect(() => {
        const userId = route.params.userId
        console.log(userId)
        setUserId(userId)
      })

    
      const storageRef = ref(storage, "Images/" + userId +".jpg")
      const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/" + userId +".jpg")

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
      }, [userId]);

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
if(selectedProfileImage == null) {
  return (
  <View><Text>Loading..</Text></View>)
} else {
      return (
        <ScrollView>
          <SafeAreaView style={Styles.titleBox}>
            <Text style={Styles.title}>Change your picture:</Text>
          </SafeAreaView>
          <SafeAreaView style={Styles.titleBox}>
            <Avatar.Image size={200} source={{uri: selectedProfileImage}} />
          </SafeAreaView>
            
            <TouchableOpacity style={Styles.pickPhoto} onPress={openImagePickerAsync}>
              <Text style={Styles.picPhotoText}>Click here to change Image</Text>
            </TouchableOpacity>
          
        </ScrollView>
      )
}
    
}
