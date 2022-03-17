import React, {Component} from 'react';
import {View, Text} from 'react-native';


class LogInScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>Login</Text>
            
        </View>
        )
      }
    }

    export default LogInScreen;