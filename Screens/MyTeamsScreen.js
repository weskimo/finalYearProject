import React, {Component} from 'react';
import {View, Text} from 'react-native';


class MyTeamsScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>MyTeamsScreen</Text>
            
        </View>
        )
      }
    }

    export default MyTeamsScreen;