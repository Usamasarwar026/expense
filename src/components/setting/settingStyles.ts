import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center',
      paddingHorizontal: 20,
      gap: 20,
    },
    imageBox: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: '#EEE5FF',
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
  