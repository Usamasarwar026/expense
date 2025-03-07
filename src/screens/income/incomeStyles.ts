import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00A86B',
    },
    topcontainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    topcontainerText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
      width: '55%',
    },
    inputcontainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingHorizontal: 20,
    },
    secondContainer: {
      flex: 4,
      paddingHorizontal: 20,
    },
    secondContainerText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FCFCFC',
    },
    secondContaineramount: {
      fontSize: 50,
      fontWeight: '600',
      color: '#FCFCFC',
      paddingTop: 20,
      marginBottom: 20,
    },
    belowContainer: {
      flex: 10,
      backgroundColor: 'white',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingTop: 50,
    },
    belowinnerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#F1F1FA',
      paddingVertical: 20,
      marginHorizontal: 30,
      marginVertical: 10,
      borderRadius: 16,
    },
    belowinnerContainerText: {
      fontSize: 16,
      fontWeight: '400',
      color: '#91919F',
    },
    textareaBox: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 16,
    },
    numberInputBox: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderColor: '#F1F1FA',
      width: '100%',
    },
    numberInput: {
      fontSize: 16,
      fontWeight: '400',
      color: 'black',
      borderWidth: 1,
      borderColor: '#F1F1FA',
      paddingHorizontal: 10,
      borderRadius: 16,
      width: '100%',
      height: 60,
    },
    textArea: {
      height: 60,
      borderColor: '#F1F1FA',
      fontSize: 16,
      fontWeight: '400',
      color: 'black',
      borderWidth: 1,
      borderRadius: 16,
      padding: 10,
    },
    attachBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      paddingHorizontal: 30,
      paddingVertical: 20,
      marginHorizontal: 30,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F1F1FA',
      alignItems: 'center',
      marginVertical: 10,
    },
    saveButton: {
      backgroundColor: '#7F3DFF',
      paddingVertical: 15,
      marginHorizontal: 30,
      marginVertical: 30,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FCFCFC',
    },
  
    imagePreview: {
      justifyContent: 'center',
      marginHorizontal: 30,
      marginVertical: 10,
    },
    previewImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    cancelButton: {
      position: 'absolute',
      top: -8,
      left: 80,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  