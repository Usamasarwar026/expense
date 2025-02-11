


import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IMAGES } from "../../constant/image"; // Make sure IMAGES contains ARROW_DOWN
import { useFocusEffect } from "@react-navigation/native";

export default function Dropdown({dropdownPosition, setSelectedMonth}: any) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [listVisible, setListVisible] = useState(false);
  const [listData] = useState([
    { id: 1, label: "All", value: "All" },
    { id: 2, label: "January", value: "January" },
    { id: 3, label: "February", value: "February" },
    { id: 4, label: "March", value: "March" },
    { id: 5, label: "April", value: "April" },
    { id: 6, label: "May", value: "May" },
    { id: 7, label: "June", value: "June" },
    { id: 8, label: "July", value: "July" },
    { id: 9, label: "August", value: "August" },
    { id: 10, label: "September", value: "September" },
    { id: 11, label: "October", value: "October" },
    { id: 12, label: "November", value: "November" },
    { id: 13, label: "December", value: "December" },

  ]);

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       setListVisible(false);
  //       // setSelectedValue("Month");
  //     };
  //   }, [])
  // );

  useFocusEffect(
    useCallback(() => {
      setSelectedValue("Month"); // Reset title to "Month" on refresh
      // setSelectedMonth(null); // Show all transactions
      return () => setListVisible(false);
    }, [])
  );
  
  return (
    
    <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => setListVisible(!listVisible)}
      >
        <Text style={styles.label}>{selectedValue || "Month"}</Text>
        <Image source={IMAGES.ARROW_DOWN} style={styles.icon} />
      </TouchableOpacity>

      {/* Dropdown List */}
      {listVisible && (
        
        <SafeAreaView style={[
          styles.listContainer,
          dropdownPosition === "center" && styles.centerDropdown,
          dropdownPosition === "left" && styles.rightDropdown,
        ]}>
          <ScrollView style={styles.list}>
            {listData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemButton}
                onPress={() => {
                  setSelectedValue(item.value);
                  setSelectedMonth(item.value);
                  setListVisible(false);
                }}
              >
                <Text style={styles.item}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
