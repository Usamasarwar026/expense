import React from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './currencyModelStyles';
import { CurrencyModalProps } from '../../types/types';
import { CURRENCY_LIST } from '../../constant/constant';

export default function CurrencyModal({ visible, onClose, onSelectCurrency }:CurrencyModalProps) {
 

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Currency</Text>
          <FlatList
            data={CURRENCY_LIST}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => onSelectCurrency(item)}>
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
