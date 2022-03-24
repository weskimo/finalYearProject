import { SafeAreaView } from "react-native-safe-area-context"
import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';


const MyProfileBannerComp = (props) => {
    const [userId, setUserId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const[gamerTag, setGamerTag] = useState('')


    useEffect( () => {
       
        setGamerTag(this.props.gamerTag)
    } )

    return (
        <SafeAreaView>
            <Text>
                {gamerTag}
            </Text>
        </SafeAreaView>
    )

}

export default MyProfileBannerComp