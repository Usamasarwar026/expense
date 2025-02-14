import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IMAGES } from "../../constant/image"; 
import { useFocusEffect } from "@react-navigation/native";
import { MONTH } from "../../constant/constant";
import { styles } from "./dropdownStyle";

export default function Dropdown({dropdownPosition, setSelectedMonth}: any) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [listVisible, setListVisible] = useState<boolean>(false);
  
  useFocusEffect(
    useCallback(() => {
      setSelectedValue("Month"); 
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
            {MONTH.map((item) => (
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
