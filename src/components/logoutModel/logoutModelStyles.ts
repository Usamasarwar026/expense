import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject, // This will make the background cover the entire screen
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for blur effect
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    modalView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '30%', // Adjust height as needed
      backgroundColor: 'white',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5, // Adds shadow effect
    },
    logoutline: {
      borderTopColor: '#D3BDFF',
      borderTopWidth: 3,
      width: '10%',
      height: 2,
      marginBottom: 15,
    },
    logout: {
      marginBottom: 15,
      fontSize: 24,
      fontWeight: 'bold',
    },
    logoutbtn: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: '#91919F',
    },
    button: {
      borderRadius: 10,
      paddingHorizontal: 50,
      paddingBottom: 18,
      paddingTop: 18,
      backgroundColor: '#EEE5FF',
      marginBottom: 10,
    },
    button1: {
      borderRadius: 10,
      paddingHorizontal: 50,
      paddingBottom: 18,
      paddingTop: 18,
      backgroundColor: '#7F3DFF',
      marginBottom: 10,
    },
    buttonText: {
      color: '#7F3DFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonText1: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  