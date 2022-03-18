import React, {Component} from 'react';
import {View, Text} from 'react-native';


class EditTeamEventsScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>Edit team events</Text>
            
        </View>
        )
      }
    }

    export default EditTeamEventsScreen;