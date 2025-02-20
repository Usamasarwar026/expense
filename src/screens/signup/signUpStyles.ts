import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    scroll:{
      flexGrow: 1,
      width: '100%',
    },
    topcontainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    topcontainerText: {
      fontSize: 16,
      fontWeight: '700',
    },
    inputcontainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingHorizontal: 30,
    },
    inputField: {
      width: 343,
      height: 56,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: 'black',
    },
    label: {
      flex: 1,
      paddingHorizontal: 33,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
    },
    labelText: {
      color: '#7F00FF',
    },
    btn: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 343,
      height: 56,
      backgroundColor: '#7F3DFF',
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700',
    },
    orText: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      fontSize: 16,
      color: 'black',
    },
    googletext: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 5,
    },
    googleSign: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    login: {
      flex: 3,
      alignItems: 'center',
      fontSize: 16,
      marginBottom: 10,
    },
  
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: '#7F3DFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    checked: {
      backgroundColor: '#7F3DFF',
    },
    checkmark: {
      color: 'white',
      fontSize: 16,
    },
  });
  