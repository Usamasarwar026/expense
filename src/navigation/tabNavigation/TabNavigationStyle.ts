import { StyleSheet } from "react-native";



export const style = StyleSheet.create({
    tabBar: {
      position: 'absolute',
      height: 60,
      backgroundColor: '#fff',
      borderTopWidth: 0,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    curvedTabBar: {
      position: 'absolute',
      height: 60,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    addButton: {
      width: 55,
      height: 55,
      backgroundColor: '#7F3DFF',
      borderRadius: 27.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
  });
  