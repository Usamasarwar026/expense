import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6F6F6',
      paddingTop: 20,
    },
    topcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    containerRight: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '60%',
    },
    imageBox: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      height: 90,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: '#e03dff',
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    username: {
      fontSize: 14,
      fontWeight: '500',
      color: '#91919F',
    },
    originalName: {
      fontSize: 24,
      fontWeight: '600',
      color: '#161719',
    },
    editButton: {
      width: 40,
      height: 40,
    },
    setComponent: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 26,
      marginTop: 40,
      paddingHorizontal: 20,
      marginHorizontal: 20,
    },
    
  
  
  });
  