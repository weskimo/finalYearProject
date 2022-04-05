import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function ImagePickerComp() {

  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);


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
  
      setSelectedImage({ localUri: pickerResult.uri });
    }
    
    if (selectedImage !== null) {
  return (
    <View>
      
      <Image
      source={{ uri: selectedImage.localUri }}
      style={styles.thumbnail}
    />
      <Text>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync}>
        <Text>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  )

} else {
  return (
    <View>
      
      
      <Text>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

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