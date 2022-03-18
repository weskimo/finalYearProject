import { doc, setDoc } from 'firebase/firestore';
import React, {Component} from 'react';
import { render } from 'react-dom';
import {View, Text, Button, SafeAreaView, TextInput} from 'react-native';
import { db } from '../db/firestore';


class MyProfileScreen extends Component {
    constructor(props){
      super(props);

      this.state = {
        isLoading: true,
        firstName: '',
        lastName: '',
        userID: '',
        bio: '',
        DOB: '',
        teams: [],
        
      }
    }

    createDoc = async () => {
        const myDoc = doc(db, "Users", "MyDoc");
        const docData = {
            "name": this.state.firstName
        }
        setDoc(myDoc,docData)
        .then(()=>{
            alert("Document created");
        })
        .catch((error)=>{
            alert(error.message);
        })
    }

    
  


      render() {
        const navigation = this.props.navigation; 
        return(
        <SafeAreaView>
            <Text>MyProfileScreen</Text>
            <TextInput 
              placeholder="Write you first name here.."
              onChangeText={ value => this.setState({firstName: value})}
              value={this.state.firstName} />
            <Button title="makeDoc" onPress={this.createDoc()}/>

            
        </SafeAreaView>
        )
      }
    }

    export default MyProfileScreen;