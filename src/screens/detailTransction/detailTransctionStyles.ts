import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/color";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
    },
    topcontainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: COLORS.RED_SALSA,
      padding: 20,
      borderBottomLeftRadius: 20,
      borderBottomEndRadius: 20,
    },
    topcontainerText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.WHITE,
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
      color: COLORS.WHITE,
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      padding: 5,
      color: COLORS.WHITE,
    },
    datebox: {
      flexDirection: 'row',
      gap: 20,
      padding: 5,
    },
    dateboxText: {
      fontSize: 13,
      fontWeight: '500',
      color: COLORS.WHITE,
    },
  
    belowContainer: {
      flex: 2,
      backgroundColor: COLORS.WHITE,
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
      borderColor: COLORS.GREY,
      borderBottomWidth: 2,
      borderBottomColor: COLORS.CLOUD_GREY,
      borderStyle: 'dashed', 
    },
    box1Text: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.MUTED_GREY,
    },
    box1Text2: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.DARK_SHADE_GREY,
      paddingTop: 5,
    },
    description: {
      padding: 15,
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.DARK_GREY,
      width: '100%',
      lineHeight: 20,
      marginBottom: 50,
    },
    descriptionHead: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.MUTED_GREY,
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 16,
      fontWeight: '500',
      color: COLORS.DARK_SHADE_GREY,
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
      color: COLORS.MUTED_GREY,
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
      backgroundColor: COLORS.DARK_PURPLE,
      marginBottom: 20,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.WHITE,
      textAlign: 'center',
      padding: 5,
    },

    modalBackground: {
      flex: 1,
      backgroundColor: COLORS.BLACK,
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
      tintColor: COLORS.WHITE,
    },
  });
  