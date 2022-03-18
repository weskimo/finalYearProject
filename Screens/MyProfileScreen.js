import { doc, setDoc } from 'firebase/firestore';
import React, {Component} from 'react';
import { render } from 'react-dom';
import {View, Text, Button} from 'react-native';
import { db } from '../db/firestore';


class MyProfileScreen extends Component {
    constructor(props){
      super(props);

      this.state = {
        isLoading: true,
        firstName: '',
        lastName: ''
      }
    }

    createDoc = async () => {
        const myDoc = doc(db, "MyCollection","MyDocument");
        const docData = {
            "name": "Tom"
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
        <View>
            <Text>MyProfileScreen</Text>
            <Text>{this.state.firstName}</Text>
            <Button title="makeDoc" onPress={this.createDoc()}/>

            
        </View>
        )
      }
    }

    export default MyProfileScreen;