import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGES} from '../../constant/image';
import {styles} from './dropdownStyles';
import {DropdownProps} from '../../types/types';
import {useDropdown} from './useDropdown';

export default function Dropdown({
  dropdownPosition,
  setSelectedMonth,
}: DropdownProps) {
  const {selectedValue, listVisible, toggleList, handleSelectMonth, months} =
    useDropdown(setSelectedMonth);

  return (
    <View>
      <TouchableOpacity style={styles.box} onPress={toggleList}>
        <Text style={styles.label}>{selectedValue || 'Month'}</Text>
        <Image source={IMAGES.ARROW_DOWN} style={styles.icon} />
      </TouchableOpacity>

      {listVisible && (
        <SafeAreaView
          style={[
            styles.listContainer,
            dropdownPosition === 'center' && styles.centerDropdown,
            dropdownPosition === 'left' && styles.rightDropdown,
          ]}>
          <ScrollView style={styles.list}>
            {months?.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemButton}
                onPress={() => handleSelectMonth(item.value)}>
                <Text style={styles.item}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
