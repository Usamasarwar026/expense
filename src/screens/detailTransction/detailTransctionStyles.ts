import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    topcontainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#FD3C4A',
      padding: 20,
      borderBottomLeftRadius: 20,
      borderBottomEndRadius: 20,
    },
    topcontainerText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    topbar: {
      flex: 1,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    redcontainer: {
      flex: 3,
      alignItems: 'center',
    },
    amount: {
      fontSize: 48,
      fontWeight: '700',
      color: 'white',
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      padding: 5,
      color: 'white',
    },
    datebox: {
      flexDirection: 'row',
      gap: 20,
      padding: 5,
    },
    dateboxText: {
      fontSize: 13,
      fontWeight: '500',
      color: 'white',
    },
  
    belowContainer: {
      flex: 2,
      backgroundColor: 'white',
      height: 150,
      marginTop: -50,
      alignItems: 'center',
      marginHorizontal: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      
    },
    belowBox1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 15,
      borderColor: '#E6E6E6',
      borderBottomWidth: 2,
      borderBottomColor: '#E3E5E5',
      borderStyle: 'dashed', 
    },
    box1Text: {
      fontSize: 14,
      fontWeight: '500',
      color: '#91919F',
    },
    box1Text2: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0D0E0F',
      paddingTop: 5,
    },
    description: {
      padding: 15,
      fontSize: 14,
      fontWeight: '500',
      color: '#91919F',
      width: '100%',
      lineHeight: 20,
      marginBottom: 50,
    },
    descriptionHead: {
      fontSize: 16,
      fontWeight: '600',
      color: '#91919F',
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#0D0E0F',
      lineHeight: 20,
    },
    pictureBox: {
      flex: 1,
      width: '100%',
      marginBottom: 20,
      padding: 15,
    },
    pic: {
      width: '100%',
      height: 116,
      marginBottom: 10,
      borderRadius: 8,
    },
    imageText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#91919F',
      marginBottom: 10,
    },
    actualpic: {
      width: '100%',
      height: 116,
      borderRadius: 8,
      overflow: 'hidden',
    },
    button: {
      width: '100%',
  
      borderRadius: 16,
      paddingBottom: 8,
      paddingTop: 8,
      backgroundColor: '#7F3DFF',
      marginBottom: 20,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center',
      padding: 5,
    },

    modalBackground: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullScreenImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 10,
      borderRadius: 20,
      zIndex: 10,
    },
    closeIcon: {
      width: 24,
      height: 24,
      padding: 15,
      tintColor: '#fff',
    },
  });
  