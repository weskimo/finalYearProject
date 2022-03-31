import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
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


// Here we need now to load in the applications as a flat list, 
// then we can open an inidividual application, need a new screen for that.
// have a list here, when an item is selected, we take that items id, and use that to open the application in the page as a passed route props.
// on that page we need an accept/decline button that sends a notification, so we need to generate notifications somewhere on that next page. 


function ManageApplications ({ route, navigation }) {

    

    const [userId, setUserId] = useState('')
    const [teamId, setTeamId] = useState('')

    const [teams, setTeams] = useState([])

    const [applicationId, setApplicationId] = useState('')






    useEffect(() => {
        const itemId  = route.params.teamId
        const userId = route.params.userId
        setTeamId(itemId)
        setUserId(userId)
      })



    const getAllApplications = async () => {
        const querySnapshot = await getDocs(collection(db, "Teams", teamId, "Applications"));
        querySnapshot.forEach((doc) => {
            const joined = teams.concat(doc.id)
            setTeams(joined)
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    }



    return (
        <SafeAreaView>
            <Text>Manage Applications:</Text>
            <FlatList
                data={teams}
                renderItem={({item}) => (
                    <View>
                        <Text>{item}</Text>
                        <Button title="SelectApplication" onPress={() => setApplicationId(item)} />
                        <Button title="View Application" onPress={() => {navigation.navigate("View Application", {
                            teamId:teamId,
                            applicationId: applicationId
                            })}}/>
                    </View>
                    )}
                keyExtractor={(item,index) => item.toString()}
            />

            <Button title="Get List" onPress={getAllApplications} />
            
        </SafeAreaView>
    )


}


export default ManageApplications;