import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { async, FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, FieldValue } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, getDocs, deleteDoc, query, where, addDoc} from 'firebase/firestore';
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/MyProfileStyles.js';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { List } from 'react-native-paper';
import { State } from 'react-native-gesture-handler';


function EditTeamEventsScreen({ route, navigation }) {

  const [teamId, setTeamId] = useState('')
  const [eventName, setEventName] = useState('')
  const [eventInfo, setEventInfo] = useState('')

  const [eventsIds, setEventsIds] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('')

  useEffect(() => {
    const teamId  = route.params.teamId
    setTeamId(teamId)
  })

  useEffect( async() => {
    const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Events"));
    querySnapshot.forEach((theDoc) => {
      setEventsIds(eventsIds => [...eventsIds, {eventId: theDoc.id,
      eventName: theDoc.get('eventName'), eventInfo: theDoc.get('eventInfo')}])
      setEvents(events => [...events, theDoc.get('eventName')])
      
      console.log(theDoc.id, " => ", theDoc.data());
    });
  }, [makeEvent, teamId])

  const makeEvent = async () => {
    const docRef = await addDoc(collection(db,"Teams", teamId,"Events"), {
        eventName: eventName,
        eventInfo: eventInfo
    });
    console.log("Document written in Events collections with ID: ", docRef.id);
  }

        return(
        <SafeAreaView>
            <Text>Edit team events</Text>
            <Text>Make New Event:</Text>
            <Text>Event Name: {eventName}</Text>
            <TextInput
              placeholder='Event Name'
              value={eventName}
              onChangeText={text => setEventName(text)}
            />
            <Text>Event Info{eventInfo}</Text>
            <TextInput
              placeholder='Event Info'
              value={eventInfo}
              onChangeText={text => setEventInfo(text)}
            />
            <Button title="Make Event" onPress={makeEvent} />

            <FlatList
              data={eventsIds}
              renderItem={({item}) => (
                <View>
                  <Text>{item.eventId}</Text>
                  <TouchableOpacity onPress={setSelectedEvent(item)}> 
                    <Text>Event Name: {item.eventName}</Text>
                    <Text>Event Info: {item.eventInfo}</Text>
                  </TouchableOpacity>
                  
                  
                </View>
                )}
                keyExtractor={(item,index) => item.eventId.toString()}
            />
            
        </SafeAreaView>
        )
      }
    

    export default EditTeamEventsScreen;