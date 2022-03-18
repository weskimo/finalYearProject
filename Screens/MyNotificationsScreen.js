import React, {Component} from 'react';
import {View, Text} from 'react-native';


class MyNotificationsScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>MyNotificationsScreen</Text>
            
        </View>
        )
      }
    }

    export default MyNotificationsScreen;