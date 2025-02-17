import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CategoryDropdown from '../categoryDropdown/CategoryDropdown';
import {styles} from './transctioModelStyles';
import {TransctionModelProps} from '../../types/types';

export default function TransctionModel({
  visible,
  onClose,
  filters,
  setFilters,
  applyFilters,
  setCategory,
}: TransctionModelProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modelView}>
        <View style={styles.modelLine}></View>

        <View style={styles.firstBox}>
          <Text style={styles.firstBoxText}>Filter Transaction</Text>
          <TouchableOpacity
            onPress={() => {
              setFilters({
                type: null,
                sortBy: 'Highest' as 'Highest' | 'Lowest' | 'Newest' | 'Oldest',
                category: 'choose Category',
              });
            }}>
            <Text style={styles.firstBoxText1}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondBox}>
          <Text style={styles.Text}>Filter By</Text>
          <View style={styles.secondBoxText2}>
            <TouchableOpacity
              onPress={() => setFilters({...filters, type: 'income'})}>
              <Text
                style={[
                  styles.text1,
                  filters.type === 'income' && styles.activeText,
                ]}>
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilters({...filters, type: 'expense'})}>
              <Text
                style={[
                  styles.text1,
                  filters.type === 'expense' && styles.activeText,
                ]}>
                Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.secondBox}>
          <Text style={styles.Text}>Sort By</Text>
          <View style={styles.secondBoxText2}>
            {['Highest', 'Lowest', 'Newest', 'Oldest'].map(sortOption => (
              <TouchableOpacity
                key={sortOption}
                onPress={() =>
                  setFilters({
                    ...filters,
                    sortBy: sortOption as
                      | 'Highest'
                      | 'Lowest'
                      | 'Newest'
                      | 'Oldest',
                  })
                }>
                <Text
                  style={[
                    styles.text1,
                    filters.sortBy === sortOption && styles.activeText,
                  ]}>
                  {sortOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.secondBox}>
          <Text style={styles.Text}>Category</Text>
          <TouchableOpacity style={styles.chooseBox}>
            <CategoryDropdown
              dropdownPosition="above"
              style="AllExpense"
              type="All"
              setCategory={category => setFilters({...filters, category})}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.Touchbtn} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
