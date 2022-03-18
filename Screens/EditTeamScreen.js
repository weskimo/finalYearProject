import React, {Component} from 'react';
import {View, Text} from 'react-native';


class EditTeamScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>EditTeamScreen</Text>
            
        </View>
        )
      }
    }

    export default EditTeamScreen;