import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    
    thumbnail: {
          width: 300,
          height: 150,
          resizeMode: "contain"
    },
    profileHeaderBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    picBox: {
        marginHorizontal: 0,
        marginVertical: 0
    },
    buttonBox: {
        justifyContent: 'space-around'
    },
    infoBox: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    teamName: {
        fontWeight: 'bold',
        fontSize: 35
    }
    ,
    nameBox: {
        alignItems: 'center',
        
    },
    bioText: {
        fontSize: 15,
        marginHorizontal: 5,
        marginVertical: 2
    },
    bioTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginVertical: 2
    },
    button: {
        alignItems: "center",
        backgroundColor: "#2B2D42",
        padding: 10,
        marginVertical: 3
        },
    teamsText: {
        color: '#FFFFFF'
    },
    

    })