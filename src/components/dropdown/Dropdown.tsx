import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGES} from '../../constant/image';
import {useFocusEffect} from '@react-navigation/native';
import {MONTH} from '../../constant/constant';
import {styles} from './dropdownStyles';
import {DropdownProps} from '../../types/types';

export default function Dropdown({
  dropdownPosition,
  setSelectedMonth,
}: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [listVisible, setListVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setSelectedValue('Month');
      return () => setListVisible(false);
    }, []),
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.box}
        onPress={() => setListVisible(!listVisible)}>
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
            {MONTH.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemButton}
                onPress={() => {
                  setSelectedValue(item.value);
                  setSelectedMonth(item.value);
                  setListVisible(false);
                }}>
                <Text style={styles.item}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
