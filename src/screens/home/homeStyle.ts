import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/color";

export const styles = StyleSheet.create({
  maincontainer:{
    flex: 1,
  },  
  container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
    },
    topback:{
      backgroundColor: COLORS.LIGHT_PASTEL_PEACH,
      paddingBottom: 20,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    },
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    innertop: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 343,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    dropdown: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 10,
    },
    picbox: {
      width: 40,
      height: 40,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: COLORS.DARK_PURPLE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    picboximage: {
      width: 33,
      height: 33,
      borderRadius: 50,
    },
  
    blnc: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.MUTED_GREY,
      textAlign: 'center',
    },
    blncamount: {
      fontSize: 40,
      fontWeight: '600',
      textAlign: 'center',
    },
    parentbox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginTop: 20,
    },
    imageBox: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      borderRadius: 10,
      backgroundColor: COLORS.WHITE,
    },
    balanceBox: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: COLORS.GREEN,
      width: 175,
      height: 80,
      borderRadius: 28,
    },
    balanceBox1: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: COLORS.RED,
      width: 175,
      height: 80,
      borderRadius: 28,
    },
    parentText: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.WHITE,
    },
    parentAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.WHITE,
    },
    thirdcontainerText: {
      paddingTop: 10,
      fontSize: 18,
      fontWeight: '600',
      paddingHorizontal: 20,
    },
    graphcontainer: {
      marginHorizontal: 0,
      paddingHorizontal: 0,
      alignItems: 'center',
    },
    daybar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
    },
  
    barbox: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.SOFT_PEACH,
      borderRadius: 20,
      height: 34,
      width: 90,
    },
    barbox1: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      height: 34,
      width: 90,
    },
    recentBar: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 15,
    },
    recentBarText1: {
      fontSize: 18,
      fontWeight: '600',
    },
    recentBarText2: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.DARK_PURPLE,
      backgroundColor: COLORS.PURPLE_BLUE,
      paddingHorizontal: 15,
      paddingTop: 8,
      paddingBottom: 8,
  
      borderRadius: 20,
      textAlign: 'center',
    },
    listbar: {
      flex: 3,
      flexDirection: 'column',
      marginBottom: 30,
    },
    listtext:{
      fontSize: 18,
      fontWeight: '600',
      paddingHorizontal: 20,
      paddingVertical: 20,
      textAlign: 'center',
      marginBottom: 30,
    },
    listtextBox: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    filterButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      height: 34,
      width: 90,
    },
    selectedFilter: {
      backgroundColor: COLORS.SOFT_PEACH,
    },
    filterText: {
      color: COLORS.MUTED_GREY,
    },
    selectedFilterText: {
      color: COLORS.YELLOW_ORANGE,
    },
  });
  