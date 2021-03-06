import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { db, storage } from '../db/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import MyProfileScreen from './MyProfileScreen';
import EditMyProfileScreen from './EditMyProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImagePickerComp from './ImagepickerComp';
import MyNotificationsScreen from './MyNotificationsScreen'



const Stack = createNativeStackNavigator();

function ProfileStack() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} initialRouteName="MyProfileScreen" options={{headerShown: false}} />
        <Stack.Screen name="EditProfile" component={EditMyProfileScreen} />
        <Stack.Screen name="ChangePicture" component={ImagePickerComp} />
        <Stack.Screen name="Notifications" component={MyNotificationsScreen} />
    </Stack.Navigator>

  )
}

export default ProfileStack;


