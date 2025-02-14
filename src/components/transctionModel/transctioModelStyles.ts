import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modelView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '67%',
      padding: 20,
      alignItems: 'center',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      backgroundColor: 'white',
      elevation: 5,
    },
    modelLine: {
      borderTopColor: '#D3BDFF',
      borderTopWidth: 3,
      width: '10%',
      height: 2,
      marginBottom: 15,
    },
    firstBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: 15,
      paddingBottom: 15,
    },
    firstBoxText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    firstBoxText1: {
      fontSize: 14,
      fontWeight: '500',
      color: '#7F3DFF',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 8,
      borderRadius: 40,
      backgroundColor: '#EEE5FF',
    },
    secondBox: {
      width: '100%',
    },
    Text: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    secondBoxText2: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: 15,
      paddingBottom: 15,
      width: '100%',
      paddingHorizontal: 16,
    },
    text1: {
      fontSize: 14,
      fontWeight: '500',
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 24,
      backgroundColor: '#E3E5E5',
      marginRight: 8,
      marginBottom: 8,
    },
    text2: {
      fontSize: 14,
      fontWeight: '500',
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 24,
      color: '#7F3DFF',
      backgroundColor: '#E3E5E5',
      marginLeft: 8,
      marginBottom: 8,
    },
    chooseBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 16,
    },
    innerchooseBox: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
      alignItems: 'center',
    },
    secondBoxText: {
      fontSize: 16,
      fontWeight: '500',
    },
    innerchooseBoxText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#91919F',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    Touchbtn: {
      backgroundColor: '#7F3DFF',
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
    },
    activeText: {
      backgroundColor: '#7F3DFF',
      color: 'white',
    },
  });
  