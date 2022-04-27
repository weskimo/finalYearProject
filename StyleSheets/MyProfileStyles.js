import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    
    thumbnail: {
          width: 300,
          height: 150,
          resizeMode: "contain"
        },

    rankIcon: {
      width: 50,
      height: 50,
      resizeMode: "contain",
      marginVertical: 10,
      marginHorizontal: 10,
    },
     

    pageContainer: {
      flex: 1,
      backgroundColor: `#EDF2F4` 
    },

    profilePicInfo: {
      backgroundColor: `#EDF2F4` , 
      flexDirection: 'row',
      marginVertical: 10,
      justifyContent: 'space-between',
      marginHorizontal: 10,
      
      
    },

    profileInfo2: {
      marginVertical: 15,
    },

    

    profilePicInfoButton: {
      backgroundColor: `#EDF2F4`  , 
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10,
      justifyContent: 'space-between',
      
      borderColor: '#2B2D42',
    },

    rankInfoBox: {
      flexDirection: 'row',
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      justifyContent: 'space-between',
      
      borderColor: '#2B2D42',
    },
    rankInfo: {
      
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      justifyContent: 'space-between',
      
    },
    rankText: {
      fontSize: 15,
      fontWeight: "bold",
    },
    profileInfo: {
      fontSize: 15,
      fontWeight: "bold",
      marginVertical: 5,
      alignItems: "center",
    },
    bioText: {
      fontSize: 15,  
    },

    bioBox: {
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      marginVertical: 10,
      borderColor: '#2B2D42',
    },

    teamsListBox: {
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      marginVertical: 10,
      
      borderColor: '#2B2D42',
    },

    teams: {
      alignItems: "center",
      backgroundColor: "#2B2D42",
      padding: 10,
      marginVertical: 3
    },

    teamsText: {
      color: '#FFFFFF'
    },
    buttonsBox: {
      justifyContent: 'space-around'
    }



    

});