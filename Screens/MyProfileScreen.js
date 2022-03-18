import React, {Component} from 'react';
import {View, Text} from 'react-native';


class MyProfileScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>MyProfileScreen</Text>
            
        </View>
        )
      }
    }

    export default MyProfileScreen;