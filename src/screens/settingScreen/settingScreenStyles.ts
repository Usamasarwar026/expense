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
      paddingHorizontal: 30,
    },
  
    btn: {
      flex: 6,
    },
    currencyBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 56,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      color: 'black',
      marginVertical: 5,
    },
    rightBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 25,
      height: 25,
      marginLeft: 5,
    },
    currencyBoxText: {
      fontSize: 16,
      fontWeight: '700',
    },
  });
  