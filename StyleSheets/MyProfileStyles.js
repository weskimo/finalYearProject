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
      backgroundColor: `#8D99AE` 
    },

    profilePicInfo: {
      backgroundColor: `#EDF2F4` , 
      flexDirection: 'row',
      marginVertical: 10,
      
      
    },

    profilePicInfoButton: {
      backgroundColor: `#EDF2F4`  , 
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10,
      justifyContent: 'space-between',
      borderWidth: 5,
      borderColor: '#2B2D42',
    },

    rankInfoBox: {
      flexDirection: 'row',
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      justifyContent: 'space-between',
      borderWidth: 5,
      borderColor: '#2B2D42',
    },
    rankInfo: {
      flexDirection: 'row',
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      justifyContent: 'space-between',
      
    }

    ,
    profileInfo: {
      fontSize: 15,
      fontWeight: "bold",
      marginHorizontal: 10
    },

    bioBox: {
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      marginVertical: 10,
      borderWidth: 5,
      borderColor: '#2B2D42',
    },

    teamsListBox: {
      backgroundColor: `#EDF2F4`  , 
      marginHorizontal: 10,
      marginVertical: 10,
      borderWidth: 5,
      borderColor: '#2B2D42',
    }



    

});