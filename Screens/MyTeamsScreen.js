import React, {Component, useState , useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




function MyTeamsScreen() {

  const navigation = useNavigation();

  const [userId, setUserId] = useState('')

  useEffect( async () => {
    const getId = await AsyncStorage.getItem('@UserId')
    setUserId(getId)
        });
  

        return(
        <View>
          <Text>{userId}</Text>
            <Text>MyTeamsScreen</Text>
            <Button title="MyTeam" onPress={() => {navigation.navigate('MyTeam')}} />
            <Button title="Create Team" onPress={() => {navigation.navigate("Create a Team")}} />
            
        </View>
        )
      
    }

    export default MyTeamsScreen;