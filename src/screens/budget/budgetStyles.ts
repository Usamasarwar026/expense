import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/color";

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 90,
      color: COLORS.DARK_GREY,
    }
    
  })