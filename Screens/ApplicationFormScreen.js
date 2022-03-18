import React, {Component} from 'react';
import {View, Text} from 'react-native';


class ApplicationFormScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>Applicationformscreen</Text>
            
        </View>
        )
      }
    }

    export default ApplicationFormScreen;