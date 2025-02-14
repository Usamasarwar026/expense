import { StyleSheet } from "react-native";

 
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    financialBox: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      marginHorizontal: 20,
      borderRadius: 8,
      backgroundColor: '#EEE5FF',
      marginTop: 20,
    },
    financialBoxText: {
      color: '#7F3DFF',
      fontSize: 16,
      fontWeight: '400',
      paddingVertical: 15,
    },
    periodHeader: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      justifyContent: 'center',
    },
    periodText: {
      fontSize: 18,
      fontWeight: '600',
    },
    listbar: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 20,
    },
  });
  