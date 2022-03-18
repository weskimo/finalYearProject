import React, {Component} from 'react';
import {View, Text} from 'react-native';


class FindTeamScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>Find TeamScreen</Text>
            
        </View>
        )
      }
    }

    export default FindTeamScreen;