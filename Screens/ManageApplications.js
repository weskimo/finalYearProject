import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList, ScrollView} from 'react-native';
import { db } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore, collection, doc, addDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc , setDoc, updateDoc, arrayUnion, arrayRemove, getDocs} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import ViewApplicationScreen from './ViewApplicationScreen.js';
import Styles from '../StyleSheets/ManageApplicationStyles'
import { useIsFocused } from '@react-navigation/native';


// Here we need now to load in the applications as a flat list, 
// then we can open an inidividual application, need a new screen for that.
// have a list here, when an item is selected, we take that items id, and use that to open the application in the page as a passed route props.
// on that page we need an accept/decline button that sends a notification, so we need to generate notifications somewhere on that next page. 


function ManageApplications ({ route, navigation }) {

    // check if screen is focused
    const isFocused = useIsFocused();

    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')

    const [applications, setApplications] = useState([])
    const [applicationTags, setApplicationTags] = useState([])

    const [applicationId, setApplicationId] = useState('')






    useEffect(() => {
        const itemId  = route.params.teamId
        const userId = route.params.userId
        setTeamId(itemId)
        setUserId(userId)
      })

    useEffect( async() => {
        isFocused
        const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Applications"));
        const applicants = []
        const applicantsTags = []
        querySnapshot.forEach((doc) => {
            applicants.push(doc.id)
            applicantsTags.push(doc.get('playerTag'))
            //const joined = teams.push(doc.id)
            //setTeams(joined)
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
        setApplications(applicants)
        setApplicationTags(applicantsTags)
    }, [teamId, isFocused])  



    const getAllApplications = async () => {
        
        const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Applications"));
        const applicants = []
        querySnapshot.forEach((doc) => {
            applicants.push(doc.id)
            
            //const joined = teams.push(doc.id)
            //setTeams(joined)
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
        setApplications(applicants)
    }



    return (
        <ScrollView>
            <SafeAreaView>
                
                <FlatList
                    data={applications}
                    renderItem={({item}) => (
                        <SafeAreaView style={Styles.msgBox}>
                            <Text style={Styles.textStyle}>{applicationTags[applications.indexOf(item)]}</Text>
                            
                            <Button title="View Application"  color="#d90429" onPress={() => {navigation.navigate("View Application", {
                                teamId:teamId,
                                userId: userId,
                                applicationId: item
                                })}}/>
                        </SafeAreaView>
                        )}
                    keyExtractor={(item,index) => item.toString()}
                />
                
            </SafeAreaView>
        </ScrollView>
    )


}


export default ManageApplications;