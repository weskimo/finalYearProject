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

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { List } from 'react-native-paper';
import { State } from 'react-native-gesture-handler';
import Styles from '../StyleSheets/EditTeamEventsStyles'


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
  }, [teamId])

  const makeEvent = async () => {
    const docRef = await addDoc(collection(db,"Teams", teamId,"Events"), {
        eventName: eventName,
        eventInfo: eventInfo
    });
    console.log("Document written in Events collections with ID: ", docRef.id);
  }

  const removeEvent = async () => {
    await deleteDoc(doc(db, "Teams", teamId, "Events", selectedEvent));
  }

        return(
          <ScrollView>
            <SafeAreaView>
                <SafeAreaView style={Styles.titleBox}>
                  <Text style={Styles.title}>Make New Event:</Text>
                </SafeAreaView>
                <SafeAreaView style={Styles.makeEventBox}>
                  <Text style={Styles.eventInfo}>Event Name: {eventName}</Text>
                  <TextInput
                    style={Styles.eventInfo}
                    placeholder='Event Name'
                    value={eventName}
                    onChangeText={text => setEventName(text)}
                  />
                  <Text style={Styles.eventInfo}>Event Info:{eventInfo}</Text>
                  <TextInput
                    style={Styles.eventInfo}
                    placeholder='Event Info'
                    value={eventInfo}
                    onChangeText={text => setEventInfo(text)}
                  />
                  <Button title="Make Event" onPress={makeEvent} color="#d90429" />
                </SafeAreaView>
                <SafeAreaView style={Styles.titleBox}>
                  <Text style={Styles.title}>Selected Event (by ID): {selectedEvent}</Text>
                </SafeAreaView>
                <FlatList
                  data={eventsIds}
                  renderItem={({item}) => (
                    <SafeAreaView style={Styles.makeEventBox}>
                      
                      <TouchableOpacity onPress={() => setSelectedEvent(item.eventId)}> 
                        <Text style={Styles.eventInfo}>Event Name: {item.eventName}</Text>
                        <Text style={Styles.eventInfo}>Event Info: {item.eventInfo}</Text>
                        <Text style={Styles.eventInfo}>Unique Event ID: {item.eventId}</Text>
                      </TouchableOpacity>
                      
                      
                    </SafeAreaView>
                    )}
                    keyExtractor={(item,index) => item.eventId}
                />
                
                <Button title="Delete Selected Event" onPress={removeEvent} color="#d90429" />
                
            </SafeAreaView>
          </ScrollView>
        )
      }
    

    export default EditTeamEventsScreen;