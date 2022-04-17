import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { db, storage } from '../db/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import MyProfileScreen from './MyProfileScreen';
import EditMyProfileScreen from './EditMyProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplicationFormScreen from './ApplicationFormScreen';
import PlayerScreen from './PlayerScreen';

import FindTeamsScreen from './FindTeams';
import TeamScreen from './TeamScreen';

import MyTeamScreen from './MyTeamScreen';



const Stack = createNativeStackNavigator();

function FindTeamStack() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="FindTeams" component={FindTeamsScreen} initialRouteName="FindTeams" options={{headerShown: false}} />
        <Stack.Screen name="TeamScreen" component={MyTeamScreen}/>
        <Stack.Screen name="Apply" component={ApplicationFormScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        
    </Stack.Navigator>

  )
}

export default FindTeamStack;