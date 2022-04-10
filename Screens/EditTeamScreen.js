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

import * as ImagePicker from 'expo-image-picker';


function EditTeamScreen ({ route, navigation }) {

    const [teamId, setTeamId] = useState('')

    useEffect(() => {
        const itemId  = route.params.teamId
        setTeamId(itemId)
      })

        return(
        <View>
            <Text>EditTeamScreen</Text>

            <Button title="Change Team Picture" onPress={() => {navigation.navigate("TeamPicture", {
              teamId: teamId,
            })}} />
            
            
        </View>
        )
      
    }

export default EditTeamScreen;