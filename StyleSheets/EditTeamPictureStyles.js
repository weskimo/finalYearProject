import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    titleBox: {
        alignItems: 'center'
    },
    title: {
        marginHorizontal: 5,
        marginVertical: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 300,
        height: 150,
        resizeMode: "contain"
  },
  pickPhoto: {
    alignItems: "center",
    backgroundColor: "#d90429",
    padding: 10,
    marginVertical: 3
  },

  picPhotoText: {
    color: '#FFFFFF'
  }
})