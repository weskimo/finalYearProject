import React, {Component} from 'react';
import {View, Text} from 'react-native';


class MyTeamsEventsScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>MyTeamsEventsScreen</Text>
            
        </View>
        )
      }
    }

    export default MyTeamsEventsScreen;