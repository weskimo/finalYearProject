import React, {Component, useState , useEffect} from 'react';
import {View, Text, TextInput, Button, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { db , storage } from '../db/firestore.js';
import firebase from 'firebase/compat';
import { FirebaseSignInProvider } from '@firebase/util';
import { collection, query, where, getDocs, doc, DocumentSnapshot, addDoc } from "firebase/firestore";
import { KeyboardAvoidingView } from 'react-native';
import { authent } from '../db/firestore.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getDoc } from 'firebase/firestore';
import MyProfileBannerComp from '../Components/MyProfileBanner.js';
import { StyleSheet } from 'react-native';
import Styles from '../StyleSheets/LoLApiStyles.js';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from 'axios';
import { Divider, List, Searchbar } from 'react-native-paper';
import PlayerScreen from './PlayerScreen.js';


function LoLApiScreen({ route, navigation }) {

    


    const [playerSearch, setPlayerSearch] = useState('')
    const onChangeSearch = query1 => setPlayerSearch(query1);
    const [playerObj, setPlayerObj] = useState({})

    const [summonerLevel, setSummonerLevel] = useState('')
    const [summonerName, setSummonerName] = useState('')
    const [summonerIcon, setSummonerIcon] = useState('')
    const [Lolpuuid, setLolpuuid] = useState('')
    const [summonerID, setSummonerID] = useState('')

    const [queueType, setQueueType] = useState('')
    const [tier, setTier] = useState('')
    const [rank, setRank] = useState('')
    const [queue, setQueue] = useState('')

    const [queueType2, setQueueType2] = useState('')
    const [tier2, setTier2] = useState('')
    const [rank2, setRank2] = useState('')
    const [queue2, setQueue2] = useState('')

    const API_Key = "RGAPI-bbe46712-6619-4b29-ab6f-dafbb2463db8"

    const apiLoc = "https://euw1.api.riotgames.com"

    // /lol/league/v4/entries/by-summoner/{encryptedSummonerId}

    const getSummonerLevel = async() => {

        let APICallString = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerSearch + "?api_key=" + API_Key ;

        axios.get(APICallString).then( (response) => {

            setSummonerLevel(response.data.summonerLevel)
            setSummonerName(response.data.name)
            setSummonerIcon(response.data.profileIconId)
            setLolpuuid(response.data.puuid)
            setSummonerID(response.data.id)
            console.log(response.data.profileIconId)
            setPlayerObj(response)
            setTier('')
            setRank('')
            setQueue('')
            setTier2('')
            setRank2('')
            setQueue2('')


        }).catch((e) => {
            console.log(e)
        })
    }

    const findRank = async () => {
        let RankCallString = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerID + "?api_key=" + API_Key ;

        const soloQ = "RANKED_SOLO_5X5"

        axios.get(RankCallString).then( (response) => {
            console.log(response)
            
            if(response.data.length == 1) {
            
            setRank(response.data[0].rank)
           
            setTier(response.data[0].tier)
            
            setQueue(response.data[0].queueType)
            } else if(response.data.length == 2) {

            setRank(response.data[0].rank)
           
            setTier(response.data[0].tier)
            
            setQueue(response.data[0].queueType)
            
            setRank2(response.data[1].rank)
            
            
            setTier2(response.data[1].tier)
            
          
            setQueue2(response.data[1].queueType)
            
            }
        })

    }   

   


    return (
        <ScrollView>
            <SafeAreaView>
            <SafeAreaView style={Styles.titleBox}>
            <Text style={Styles.titleText}>Find In Game Profiles of Players:</Text>
            </SafeAreaView>
            <Searchbar
                  placeholder="Search by Summoner Name..."
                  onChangeText={onChangeSearch}
                  value={playerSearch}
                  maxLength={16}
                />

                <Button title="Search" onPress={getSummonerLevel} color="#d90429"/>
                
                
                
                


                {JSON.stringify(playerObj) != '{}' ?
                    <SafeAreaView style={Styles.titleBox}>
                        {summonerIcon != '' ? 
                        <View>
                            <Image source={{uri: "http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/" + summonerIcon + ".png"}}
                                style={Styles.rankIcon}/>
                        </View>
                        :
                        <View></View>}
                        
                        <Text style={Styles.titleText}>Summoner Name: {summonerName}</Text>
                        <Text style={Styles.titleText}>Summoner Level: {summonerLevel}</Text>
                        <Button title="Find Rank" onPress={findRank} color="#d90429"/>
                        <Text style={Styles.titleText}>{queue}:</Text>
                        <Text style={Styles.titleText}>{tier} {rank}</Text>
                        <Text style={Styles.titleText}>{queue2}:</Text>
                        <Text style={Styles.titleText}>{tier2} {rank2}</Text>
                        <Text></Text>
                        
                    </SafeAreaView>
                    :
                    <SafeAreaView>
                        
                    </SafeAreaView>
                }
                
            </SafeAreaView>
        </ScrollView>
    )

}

export default LoLApiScreen;