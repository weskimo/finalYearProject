import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyProfile from '../Screens/MyProfileScreen.js';
import Notifications from '../Screens/MyNotificationsScreen.js';
import MyTeams from '../Screens/MyTeamsScreen.js';
import FindTeams from '../Screens/FindTeams.js';
import MyTeamsStack from './MyTeamsStack.js';
import MyTeamScreen from './MyTeamScreen.js';

const Tab = createBottomTabNavigator();

class LoggedInScreen extends Component {
    constructor(props){
      super(props);
    }

      render() {
        
        return(
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'MyProfile') {
                iconName = focused
                  ? "person-circle-outline"
                  : "person-circle-outline";
              } else if (route.name === "MyTeams") {
                iconName = focused ? "people-circle-outline" : "people-circle-outline";
              } else if (route.name === "Notifications") {
                iconName = focused ? "notifications-circle-outline" : "notifications-circle-outline";
              
              } else if (route.name === 'FindTeams') {
                iconName = focused ? "person-add-outline" : "person-add-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen 
            name="MyProfile" 
            component={MyProfile}  
          />
          <Tab.Screen 
            name="Notifications" 
            component={Notifications} 
          />
          <Tab.Screen 
            name="MyTeams" 
            component={MyTeamsStack} 
          />
          <Tab.Screen 
            name="FindTeams" 
            component={FindTeams} 
          /> 
        </Tab.Navigator>    
        )
      }
    }

    export default LoggedInScreen;