import React, {Component} from 'react';
import {View, Text} from 'react-native';


class LoggedInScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>hi</Text>
            
        </View>
        )
      }
    }

    export default LoggedInScreen;