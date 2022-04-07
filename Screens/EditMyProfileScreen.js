import React, {Component, useState , useEffect} from 'react';
import {View, Text, Button} from 'react-native';


function EditMyProfileScreen ({ route, navigation }) {
  

  const [userId, setUserId] = useState('')

  useEffect(() => {
    const userId = route.params.userId
    setUserId(userId)
  })

        return(
        <View>
            <Text>Edit my profile</Text>
            <Text>{userId}</Text>

            <Button title="ChangePicture" onPress={() => {navigation.navigate("ChangePicture", {
              userId: userId
            })}} />
            
        </View>
        )
      
    }

    export default EditMyProfileScreen;