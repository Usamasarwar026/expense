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
import React, {useState} from 'react';
import {IMAGES} from '../../constant/image';
import CategoryDropdown from '../categoryDropdown/CategoryDropdown';
import {styles} from './transctioModelStyles';

export default function TransctionModel({
  visible,
  onClose,
  filters,
  setFilters,
  applyFilters,
  setCategory,
}: any) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modelView}>
        <View style={styles.modelLine}></View>

        {/* Filter Header */}
        <View style={styles.firstBox}>
          <Text style={styles.firstBoxText}>Filter Transaction</Text>
          <TouchableOpacity
            onPress={() => {
              setFilters({
                type: null,
                sortBy: 'Highest',
                category: 'choose Category',
              });
            }}>
            <Text style={styles.firstBoxText1}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Filter by Type */}
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

        {/* Sort By */}
        <View style={styles.secondBox}>
          <Text style={styles.Text}>Sort By</Text>
          <View style={styles.secondBoxText2}>
            {['Highest', 'Lowest', 'Newest', 'Oldest'].map(sortOption => (
              <TouchableOpacity
                key={sortOption}
                onPress={() => setFilters({...filters, sortBy: sortOption})}>
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

        {/* Category Selection */}
        <View style={styles.secondBox}>
          <Text style={styles.Text}>Category</Text>
          <TouchableOpacity
            style={styles.chooseBox}
            onPress={() => {
              /* Implement category selection modal */
            }}>
            <CategoryDropdown
              dropdownPosition="above"
              style="AllExpense"
              type="All"
              setCategory={filters.category}
            />
          </TouchableOpacity>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.Touchbtn} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
