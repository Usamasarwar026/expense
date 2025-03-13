import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/color";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      backgroundColor: COLORS.WHITE,
      alignItems: 'center',
      paddingHorizontal: 30,
      gap: 20,
      marginBottom:2,
    },
    imageBox: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: COLORS.PURPLE_BLUE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 30,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  