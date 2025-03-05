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
      flex: 1,
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
    picConatiner: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    picBox: {
      borderWidth: 2,
      width: 130,
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#e03dff',
  
      borderRadius: 86,
    },
    pic: {
      width: 120,
      height: 120,
      borderRadius: 86,
    },
    inputTextfields: {
      gap: 10,
    },
    inputText: {
      fontSize: 18,
      fontWeight: '600',
    },
  
    btn: {
      flex: 4,
      paddingHorizontal: 20,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 10,
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
    editbtn: {
      width: 36,
      height: 36,
      borderRadius: 30,
      backgroundColor: '#FFFFFF',
      position: 'absolute',
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  