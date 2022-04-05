import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { db, storage } from '../db/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export default function ImagePickerComp() {

  const navigation = useNavigation();

  const [selectedUploadImage, setSelectedUploadImage] = useState(null);

  const [selectedProfileImage, setSelectedProfileImage] = useState('');

  const storageRef = ref(storage, "Images/image.jpg")

  const down = ref(storage,"gs://esportsteammanagement.appspot.com/Images/image.jpg")

  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(storage, 'gs://esportsteammanagement.appspot.com/Images');

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
        return;
      }
      const img = await fetch(pickerResult.uri)
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes)
      setSelectedUploadImage({ localUri: pickerResult.uri });
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
  
    
    if (selectedUploadImage !== null) {
      return (
        <View>
          
          <Image
          source={{ uri: selectedUploadImage.localUri }}
          style={styles.thumbnail}
          />

          <Image
          source={{uri: selectedProfileImage}}
          style={styles.thumbnail}
          />
      
          <Text>
            To share a photo from your phone with a friend, just press the button below!
          </Text>

          <TouchableOpacity onPress={openImagePickerAsync}>
            <Text>Pick a photo</Text>
          </TouchableOpacity>

         
          <Button title="Download it" onPress={getDownloadImage}/>
          

        </View>
      )

    } else {
      return (
        <View>
          <Text>
            To share a photo from your phone with a friend, just press the button below!
          </Text>
          <Text>
            {selectedProfileImage}
          </Text>
          <Button title="Download it" onPress={getDownloadImage}/>

          <TouchableOpacity onPress={openImagePickerAsync}>
            <Text>Pick a photo</Text>
          </TouchableOpacity>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    /* Other styles hidden to keep the example brief... */
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    }
  })