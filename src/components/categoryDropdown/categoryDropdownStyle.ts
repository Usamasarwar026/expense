import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      gap: 10,
    },
    all: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    allListContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      position: 'absolute',
      borderWidth: 1,
      borderColor: '#7F3DFF',
      width: '100%',
      top: 40,
      zIndex: 100,
    },
    icon: {
      width: 20,
      height: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '400',
      color: '#91919F',
    },
    listContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#7F3DFF',
      width: 200,
    },
    centerDropdown: {
      alignSelf: 'center', // Center align relative to parent
      position: 'absolute',
      top: 40,
      zIndex: 100,
    },
    rightDropdown: {
      alignSelf: 'flex-start', // Align to the right side of the button
      left: 0, // Shift it to the right (equal to the button's width)
      position: 'absolute',
      top: 40,
      zIndex: 100,
    },
    aboveDropdown: {
      position: 'absolute',
      top: -230,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    list: {
      padding: 10,
      flex: 1,
      overflow: 'scroll',
      flexGrow: 1,
      // maxHeight: 200,
    },
    itemButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    item: {
      fontSize: 16,
      fontWeight: '500',
    },
  });
  