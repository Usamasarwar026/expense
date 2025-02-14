import React, {useCallback, useEffect, useState} from 'react';
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
import {EXPENSE_DATA, INCOME_DATA} from '../../constant/constant';
import {styles} from './categoryDropdownStyle';
import {CategoryDropdownProps} from '../../types/types';

export default function CategoryDropdown({
  dropdownPosition,
  type,
  style,
  setCategory = ()=>{},
}: CategoryDropdownProps) {
  const [selectedValue, setSelectedValue] = useState<String | null>(null);
  const [listVisible, setListVisible] = useState<boolean>(false);

  const allData = [...EXPENSE_DATA, ...INCOME_DATA];
  const dropdownData =
    type === 'All' ? allData : type === 'Expense' ? EXPENSE_DATA : INCOME_DATA;

  useEffect(() => {
    setListVisible(false);
  }, [type]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setListVisible(false);
        setSelectedValue('Category');
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={style === 'AllExpense' ? styles.all : styles.box}
        onPress={() => setListVisible(!listVisible)}>
        {style === 'AllExpense' ? (
          <>
            <Text style={styles.label}>{selectedValue || 'Category'}</Text>
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
                onPress={() => {
                  setSelectedValue(item.value);
                  setCategory(item.value);
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
