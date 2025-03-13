import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/color";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.RED_SALSA,
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
      color: COLORS.WHITE,
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
      color: COLORS.OFF_WHITE,
    },
    secondContaineramount: {
      fontSize: 50,
      fontWeight: '600',
      color: COLORS.OFF_WHITE,
      paddingTop: 20,
      marginBottom: 20,
    },
    belowContainer: {
      flex: 10,
      backgroundColor: COLORS.WHITE,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingTop: 50,
    },
    belowinnerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: COLORS.OFF_WHITE_PURPLE,
      paddingVertical: 20,
      marginHorizontal: 30,
      marginVertical: 10,
      borderRadius: 16,
    },
    belowinnerContainerText: {
      fontSize: 16,
      fontWeight: '400',
      color: COLORS.MUTED_GREY,
    },
    textareaBox: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 8,
    },
    numberInputBox: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderColor: COLORS.OFF_WHITE_PURPLE,
      width: '100%',
    },
    numberInput: {
      fontSize: 16,
      fontWeight: '400',
      color: COLORS.BLACK,
      borderWidth: 1,
      borderColor: COLORS.OFF_WHITE_PURPLE,
      paddingHorizontal: 10,
      borderRadius: 16,
      width: '100%',
      height: 60,
    },
    textArea: {
      height: 60,
      borderColor: COLORS.OFF_WHITE_PURPLE,
      fontSize: 16,
      fontWeight: '400',
      color: COLORS.BLACK,
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
      borderColor: COLORS.OFF_WHITE_PURPLE,
      alignItems: 'center',
      marginVertical: 10,
    },
    saveButton: {
      backgroundColor: COLORS.DARK_PURPLE,
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
      color: COLORS.OFF_WHITE,
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
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  