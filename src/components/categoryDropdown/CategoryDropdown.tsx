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
import {styles} from './categoryDropdownStyle';
import {CategoryDropdownProps} from '../../types/types';
import {useCategoryDropdown} from './useCategoryDropdown';
import {COLORS} from '../../constant/color';

export default function CategoryDropdown({
  dropdownPosition,
  type,
  style,
  setCategory = () => {},
}: CategoryDropdownProps) {
  const {
    selectedValue,
    listVisible,
    dropdownData,
    toggleDropdown,
    selectCategory,
  } = useCategoryDropdown(type, setCategory);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={style === 'AllExpense' ? styles.all : styles.box}
        onPress={toggleDropdown}>
        {style === 'AllExpense' ? (
          <>
            <Text
              style={[
                styles.label,
                {color: selectedValue ? COLORS.BLACK : COLORS.GREYS},
              ]}>
              {selectedValue || 'Category'}
            </Text>
            <Image source={IMAGES.ARROW_DOWN} style={styles.icon} />
          </>
        ) : (
          <>
            <Image source={IMAGES.ARROW_DOWN} style={styles.icon} />
            <Text style={styles.label}>{selectedValue || 'Category'}</Text>
          </>
        )}
      </TouchableOpacity>
      {listVisible && (
        <SafeAreaView
          style={[
            style === 'AllExpense'
              ? styles.allListContainer
              : styles.listContainer,
            dropdownPosition === 'center' && styles.centerDropdown,
            dropdownPosition === 'left' && styles.rightDropdown,
            dropdownPosition === 'above' && styles.aboveDropdown,
          ]}>
          <ScrollView style={styles.list}>
            {dropdownData.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemButton}
                onPress={() => selectCategory(item.value)}>
                <Text style={styles.item}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
