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
      width: '70%',
    },
    topBar: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    topBarLeft: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      gap: 10,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 240,
      marginTop: 20,
    },
    img: {
      width: 192,
      height: 192,
    },
    imageContainerText: {
      position: 'absolute',
      fontSize: 32,
      fontWeight: '700',
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal: 0,
      marginHorizontal: 20,
      height: 48,
      borderRadius: 32,
      backgroundColor: '#EEE5FF',
      overflow: 'hidden',
      marginBottom: 15,
    },
    btn1: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      borderRadius: 32,
      paddingVertical: 12,
      backgroundColor: '#7F3DFF',
      textAlign: 'center',
      color: '#fff',
    },
    btn2: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      borderRadius: 32,
      paddingVertical: 12,
      // backgroundColor: '#EEE5FF',
      color: '#7F3DFF',
      textAlign: 'center',
    },
    btnText1: {
      textAlign: 'center',
      justifyContent: 'center',  
      alignItems: 'center',
      color: '#fff',      
    },
    btnText2: {
      textAlign: 'center',
      justifyContent: 'center',  
      alignItems: 'center',
      color: 'black'      
    },
  
    
    
  });
  