import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import NotificationMessage from './NotificationMessage.js';
import Styles from '../StyleSheets/NotificationStyles'
import { Divider } from 'react-native-paper';


function MyNotificationsScreen () {


  const [notifications, setNotifications] = useState([])
  const [messages, setMessages] = useState([])
  const [userId, setId] = useState('')

  const [selectedNotiId, setNotiId] = useState('')

  useEffect( async () => {
    const getId = await AsyncStorage.getItem('@UserId')
    setId(getId)
    
        });


  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "Users", userId, "Notifications"));
    const notifications = []
    const messages = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id)
      notifications.push(doc.id)
      messages.push(doc.data)
    console.log(doc.id, " => ", doc.data());
    });
    setNotifications(notifications)
    setMessages(messages)
  }, [userId])      

  const getAllNotifications = async () => {
    const querySnapshot = await getDocs(collection(db, "Users", userId, "Notifications"));
    const notifications = []
    const messages = []
    querySnapshot.forEach( async (theDoc) => {
      const docRef = doc(db, "Users", userId, "Notifications", theDoc.id)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
      notifications.push(theDoc.id)
      messages.push(docSnap.get('message'))
        
        //const joined = teams.push(doc.id)
        //setTeams(joined)
    // doc.data() is never undefined for query doc snapshots
    console.log(theDoc.id, " => ", theDoc.data());
    }})
    setNotifications(notifications)
    setMessages(messages)
  
  }

  const deleteNoti = async (itemId) => {
    console.log("Deleted Noti")
    const noti = doc(db, "Users", userId, "Notifications", itemId);
    await deleteDoc(noti);
}

  
// can i do this by: having a component that renders for each item in the list, we pass the id of each component in the list, and then on tyhat componenent we can render
// the whole message?>


return (
  <ScrollView>
    <SafeAreaView>

      <SafeAreaView>
        <TouchableOpacity  style={Styles.titleOpa}> 
          <Text style={Styles.titleText}>Notifications:</Text>
        </TouchableOpacity>
        <Divider />

      </SafeAreaView>
        <FlatList
            data={notifications}
            renderItem={({item}) => (
                
                <SafeAreaView >
                  <NotificationMessage userid={userId} notificationid={item} />
                
                <TouchableOpacity style={Styles.deleteNotiOpa} onPress={() => deleteNoti(item)}> 
                      <Text style={Styles.deleteNotiText}> Remove Notification</Text>
                    </TouchableOpacity>
                    <Divider />
                </SafeAreaView>
                
                )}
            keyExtractor={(item,index) => item.toString()}
        />
    </SafeAreaView>
  </ScrollView>
)


}

export default MyNotificationsScreen;


