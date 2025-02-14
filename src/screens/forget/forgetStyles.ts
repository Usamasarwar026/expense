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
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: 'black',
    },
  
    textcontainer: {
      flex: 1,
      width: 343,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      // width: 343,
    },
    forgettext: {
      fontSize: 24,
      fontWeight: '600',
    },
  
    labelText: {
      color: '#7F00FF',
    },
  
    btn: {
      flex: 6,
      paddingHorizontal: 20,
      // width: 343,
      // height: 56,
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
  });
  