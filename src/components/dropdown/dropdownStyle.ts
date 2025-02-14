import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      // justifyContent: "center",
      // alignItems: "center",
    },
    box: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      //  width: 80,
    },
    icon: {
      width: 20,
      height: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
    },
    listContainer: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      borderRadius: 5,
      position: "absolute",
      borderWidth: 1,
      borderColor: '#7F3DFF',
      width: 200,
      top: 40,
      zIndex: 100,
    },
    centerDropdown: {
      alignSelf: "center", // Center align relative to parent
    },
    rightDropdown: {
      alignSelf: "flex-start", // Align to the right side of the button
      left: 0, // Shift it to the right (equal to the button's width)
    },
    list: {
      padding: 10,
      flex: 1,
      overflow: "scroll",
      flexGrow: 1,
      // maxHeight: 200,
    },
    itemButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    item: {
      fontSize: 16,
      fontWeight: "500",
    },
  });
  