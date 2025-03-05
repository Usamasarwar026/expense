import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      flex: 2,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingHorizontal: 30,
    },
    inputField: {
      width: 343,
      height: 56,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: 'black',
    },
    label: {
      paddingHorizontal: 30,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    forgettext: {
      color: '#7F00FF',
      fontWeight: 600,
    },
    labelText: {
      color: '#7F00FF',
      textDecorationLine: 'underline',
    },
    btntext:{
      color: '#91919F',    
    },
    btn: {
      flex: 1,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 343,
      height: 56,
      backgroundColor: '#7F3DFF',
      paddingVertical: 12,
      borderRadius: 16,
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
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 16,
      marginHorizontal: 20,
      marginBottom: 8,
    },
    login: {
      flex: 6,
      alignItems: 'center',
      fontSize: 16,
      marginBottom: 10,
    },
  });
  