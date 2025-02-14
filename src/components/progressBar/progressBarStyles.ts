import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    barcontainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 20,
      height: 50,
    },
    innerBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
    },
    upperInnerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 4,
      backgroundColor: '#FCFCFC',
      width: '45%',
      borderRadius: 32,
      paddingLeft: 10,
    },
    dot: {
      width: 14,
      height: 14,
      borderRadius: 50,
      backgroundColor: '#FCAC12',
    },
    dottext: {
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 10,
    },
    progressBar: {
      width: '100%',
      overflow: 'hidden',
    },
    amount: {
      color: '#FD3C4A',
      fontSize: 24,
      fontWeight: '500',
    },
  });
  