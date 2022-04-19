import React, {Component, useState , useEffect, useDebugValue} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList, ScrollView} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { async, FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/ViewApplicationStyles'


// when an item is selected on past page, we take that items id, and use that to open the application in this page as a passed route props.
// on this page we need an accept/decline button that sends a notification, so we need to generate notifications somewhere on that next page. 


function InvitePlayerScreen ({ route, navigation }) {

    // the Viewer/senders id
    const [userId, setUserId] = useState('')

    // the person being viewed/sent to
    const[playerId, setPlayerId] = useState('')

    useEffect(() => {
        const playerId = route.params.playerId
        const userId = route.params.userId
        setPlayerId(playerId)
        setUserId(userId)
      })

      return (
          <ScrollView>
              <SafeAreaView>
                  <Text>Invite Player screen</Text>
              </SafeAreaView>

          </ScrollView>
      )


}

export default InvitePlayerScreen;