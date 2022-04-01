import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
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


function MyNotificationsScreen () {


  const [notifications, setNotifications] = useState([])
  const [messages, setMessages] = useState([])
  const [userId, setId] = useState('')

  const [selectedNotiId, setNotiId] = useState('')

  useEffect( async () => {
    const getId = await AsyncStorage.getItem('@UserId')
    setId(getId)
    
        });

  const getAllNotifications = async () => {
    const querySnapshot = await getDocs(collection(db, "Users", userId, "Notifications"));
    const notifications = []
    const messages = []
    querySnapshot.forEach((doc) => {
      notifications.push(doc)
      messages.push(doc.data)
        
        //const joined = teams.push(doc.id)
        //setTeams(joined)
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
    setNotifications(notifications)
    setMessages(messages)
  
  }

  const deleteNoti = async () => {
    const noti = doc(db, "Users", userId, "Notifications", selectedNotiId);
    await deleteDoc(noti);
}

  
// can i do this by: having a component that renders for each item in the list, we pass the id of each component in the list, and then on tyhat componenent we can render
// the whole message?>


return (
  <SafeAreaView>
      <Text>Notifications:</Text>
      <FlatList
          data={notifications}
          renderItem={({item}) => (
              
              <SafeAreaView>
              <NotificationMessage userid={userId} notificationid={item.id} />
              <Button title="Select" onPress={setNotiId(item)}/>
              <Button title="Remove" onPress={deleteNoti}/>
              </SafeAreaView>
              )}
          keyExtractor={(item,index) => item.toString()}
      />

      <Button title="Get List" onPress={getAllNotifications} />
      
  </SafeAreaView>
)


}

export default MyNotificationsScreen;


/* <View>
                  <Text>{item.id}</Text>
                  <Text></Text>
                  <Button title="Select" onPress={setNotiId(item)}/>
                  <Button title="Remove" onPress={deleteNoti}/>
                  
              </View>*/