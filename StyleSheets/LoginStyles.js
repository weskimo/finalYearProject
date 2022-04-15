import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    
    thumbnail: {
          width: 300,
          height: 300,
          resizeMode: "contain",
          alignItems: 'center',
          justifyContent: 'center'
        },
        pageContainer: {
            alignItems: 'center',
           
        },
        loginInfo: {
            alignItems: 'center'
            
        },
        loginText: {
            marginVertical: 5
        },
        loginTextBold: {
            fontSize: 15,
            fontWeight: "bold",
        }
})