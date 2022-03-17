import React, {Component} from 'react';
import {View, Text} from 'react-native';


class SignUpScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        const navigation = this.props.navigation; 
        return(
        <View>
            <Text>SignUp</Text>
            
        </View>
        )
      }
    }

    export default SignUpScreen;