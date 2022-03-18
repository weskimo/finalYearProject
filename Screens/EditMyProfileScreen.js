import React, {Component} from 'react';
import {View, Text} from 'react-native';


class EditMyProfileScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>Edit my profile</Text>
            
        </View>
        )
      }
    }

    export default EditMyProfileScreen;