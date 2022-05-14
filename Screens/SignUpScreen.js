import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button, ScrollView, SafeAreaView, Image} from 'react-native';
import { db } from '../db/firestore';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { Firestore } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Styles from '../StyleSheets/SignUpStyles'

const SignUpScreen = ({route, navigation}) => {

  const [email, setEmail] = useState('');
  const [gamerTag, setGamerTag] = useState('')
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const [soloQRank, setSoloQRank] = useState('Gold')
  const [flexRank, setFlexRank] = useState('Gold')
  const [mainRole, setMainRole] = useState('Mid')


  const [isSignedIn,setIsSignedIn] = useState(false);
  const [userID, setId] = useState('')

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSignUp = () => {
    if(
        password.length < 1 ||
        gamerTag.length < 1 || 
        firstName.length < 1 ||
        lastName.length < 1 ||
        email.length < 1 ||
        soloQRank.length < 1 ||
        flexRank.length < 1 ||
        mainRole.length  < 1 ||
        gamerTag.length > 21 || 
        firstName.length > 21 || 
        lastName.length > 21 ||  
        email.length > 320 ||
        soloQRank.length > 320 ||
        flexRank.length > 320 ||
        mainRole.length > 320 ||
        password.length > 21  
      ) {
        alert("Names and password must be shorter than 21 Characters or numbers per field and a valid email must be used");
      } else {
    createUserWithEmailAndPassword(authent, email, password)
    .then(async (re) => {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user.uid);
      setIsSignedIn(true)
      const myDoc = doc(db, "Users", user.uid);
      const docData = {
        "gamerTag": gamerTag,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "teams": [],
        "soloQRank": soloQRank,
        "flexRank": flexRank,
        "mainRole": mainRole
    }
    setId(user.uid)
    setDoc(myDoc,docData)
    .then(()=>{
        alert("User created");
        navigation.navigate("Login")      
   })
    .catch((error)=>{
        alert(error.message);
  })
    })
    .catch((re) => {     
    })
  }
  }

/*
  const createDoc = async () => {
    const myDoc = doc(db, "Users", userID);
    const docData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "teams": []
    }
    setDoc(myDoc,docData)
    .then(()=>{
        alert("User created");
   })
    .catch((error)=>{
        alert(error.message);
  })
}
*/

  return (
    <ScrollView>
      
      <SafeAreaView >
      <SafeAreaView style={Styles.pic}>
        <Image 
          style={Styles.thumbnail}
          source={{uri: require("../Pics/draftdown.png")}} 
        />
      </SafeAreaView>
      
      <SafeAreaView style={Styles.signUpDeetsBox}>
        <Text style={Styles.signUpInfo}>Summoner Name:</Text>
        <TextInput
          style={Styles.signUpInfo}
          placeholder='Summoner Name here...'
          value={gamerTag}
          onChangeText={text => setGamerTag(text)}
          maxLength={16}
        />
        <Text style={Styles.signUpInfo}>Email:</Text>
        <TextInput
          style={Styles.signUpInfo}
          placeholder='Email here...'
          value={email}
          onChangeText={text => setEmail(text)}
          maxLength={320}
        />
        <Text style={Styles.signUpInfo}>First Name:</Text>
        <TextInput
          style={Styles.signUpInfo}
          placeholder='First Name here...'
          value={firstName}
          onChangeText={text => setFirstName(text)}
          maxLength={20}
          
        />
        <Text style={Styles.signUpInfo}>Last Name:</Text>
        <TextInput
          style={Styles.signUpInfo}
          placeholder='Last Name here...'
          value={lastName}
          onChangeText={text => setLastName(text)}
          maxLength={20}
          
        />
        <Text style={Styles.signUpInfo}>Password:</Text>
        <TextInput
          style={Styles.signUpInfo}
          placeholder='Password here...'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          maxLength={20}
        />
      </SafeAreaView>


      <List.Section title="Select Your Role:">
                <List.Accordion
                  title="Role"
                  left={props => <List.Icon  icon={{uri: require("../RankedRoles/" +  mainRole + ".png")}}/>}
                >
                  <List.Item title="Top" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Top.png")}} />} onPress={() => {setMainRole("Top")}}/>
                  <List.Item title="Jungle" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Jungle.png")}} />} onPress={() => {setMainRole("Jungle")}}/>
                  <List.Item title="Mid" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Mid.png")}} />} onPress={() => {setMainRole("Mid")}}/>
                  <List.Item title="Bot" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Bot.png")}} />} onPress={() => {setMainRole("Bot")}}/>
                  <List.Item title="Support" left={props => <List.Icon  icon={{uri: require("../RankedRoles/Support.png")}} />} onPress={() => {setMainRole("Support")}}/>
                </List.Accordion>
              </List.Section>
              
            
              
              <List.Section title="Select Your SoloRank:">
                    <List.Accordion
                      title="Solo Queue"
                      left={props => <List.Icon icon={{uri: require("../RankedIcons/Emblem_" +  soloQRank + ".png")}}/>}
                      >
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setSoloQRank("Challenger")}} />
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setSoloQRank("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setSoloQRank("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />} onPress={() => {setSoloQRank("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setSoloQRank("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setSoloQRank("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setSoloQRank("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />}  onPress={() => {setSoloQRank("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />} onPress={() => {setSoloQRank("Iron")}} />
                    </List.Accordion>
              </List.Section>      
            

              <List.Section title="Select Your FlexRank:">
                    <List.Accordion
                      title="Flex Queue"
                      left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_" +  flexRank + ".png")}}/>}
                      >
                      <List.Item title="Challenger" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Challenger.png")}} />} onPress={() => {setFlexRank("Challenger")}}/>
                      <List.Item title="GrandMaster" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Grandmaster.png")}} />} onPress={() => {setFlexRank("Grandmaster")}} />
                      <List.Item title="Master" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Master.png")}} />} onPress={() => {setFlexRank("Master")}} />
                      <List.Item title="Diamond" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Diamond.png")}} />}  onPress={() => {setFlexRank("Diamond")}} />
                      <List.Item title="Platinum" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Platinum.png")}} />}  onPress={() => {setFlexRank("Platinum")}} />
                      <List.Item title="Gold" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Gold.png")}} />}  onPress={() => {setFlexRank("Gold")}} />
                      <List.Item title="Silver" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Silver.png")}} />}  onPress={() => {setFlexRank("Silver")}} />
                      <List.Item title="Bronze" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Bronze.png")}} />} onPress={() => {setFlexRank("Bronze")}} />
                      <List.Item title="Iron" left={props => <List.Icon  icon={{uri: require("../RankedIcons/Emblem_Iron.png")}} />}  onPress={() => {setFlexRank("Iron")}} />
                    </List.Accordion>
                  </List.Section>

      <Button 
      title="SignUp"
      onPress={handleSignUp}
      color="#d90429"
      />
      </SafeAreaView>
      
    </ScrollView>
    
  )
}

export default SignUpScreen;

