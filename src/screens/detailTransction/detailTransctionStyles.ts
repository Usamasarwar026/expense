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
      // width: 150,
      marginHorizontal: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
    },
    belowBox1: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 15,
      // borderBottomWidth: 1,
      borderColor: '#E6E6E6',
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
      textAlign: 'justify',
      lineHeight: 20,
      // marginBottom: 20,
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
    },
    pic: {
      width: '100%',
      height: 116,
      marginBottom: 10,
      borderRadius: 8,
      // overflow: 'hidden',
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
  });
  