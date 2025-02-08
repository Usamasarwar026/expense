import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IMAGES} from '../../constant/image'; // Make sure IMAGES contains ARROW_DOWN
import {useFocusEffect} from '@react-navigation/native';

export default function CategoryDropdown({dropdownPosition, type, style}: any) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [listVisible, setListVisible] = useState(false);

  const ExpenseData = [
    {id: 'E-1', label: 'Shopping', value: 'Shopping'},
    {id: 'E-2', label: 'Subscription', value: 'Subscription'},
    {id: 'E-3', label: 'Food', value: 'Food'},
  ];

  const IncomeData = [
    {id: 'I-1', label: 'Salary', value: 'Salary'},
    {id: 'I-2', label: 'Transportation', value: 'Transportation'},
  ];
  const category = [...IncomeData, ...ExpenseData];
    const dropdownData = type === 'Expense' ? ExpenseData : IncomeData;
//   const dropdownData =
//     type === 'All' ? category : type === 'Expense' ? ExpenseData : IncomeData;
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
      {/* Dropdown Button */}
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

      {/* Dropdown List */}
      {listVisible && (
        <SafeAreaView
          style={[
            style === "AllExpense" ? styles.allListContainer : styles.listContainer,
            dropdownPosition === 'center' && styles.centerDropdown,
            dropdownPosition === 'left' && styles.rightDropdown,
          ]}>
          <ScrollView style={styles.list}>
            {dropdownData.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemButton}
                onPress={() => {
                  setSelectedValue(item.value);
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  all:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  allListContainer:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#7F3DFF',
    width: '120%',
    top: 40,
    zIndex: 100,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#7F3DFF',
    width: 200,
    top: 40,
    zIndex: 100,
  },
  centerDropdown: {
    alignSelf: 'center', // Center align relative to parent
  },
  rightDropdown: {
    alignSelf: 'flex-start', // Align to the right side of the button
    left: 0, // Shift it to the right (equal to the button's width)
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
