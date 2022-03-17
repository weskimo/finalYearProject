import React, {Component} from 'react';
import {View, Text} from 'react-native';


class LogoutScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>Logout</Text>
        </View>
        )
      }
    }

    export default LogoutScreen;