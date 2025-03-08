import React from 'react';
import {View, Text, Modal, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './currencyModelStyles';
import {CurrencyModalProps} from '../../types/types';
import {useCurrencyModal} from './useCurrencyModel';

export default function CurrencyModal({
  visible,
  onClose,
  onSelectCurrency,
}: CurrencyModalProps) {
  const {handleSelectCurrency, currencyList} =
    useCurrencyModal(onSelectCurrency);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Currency</Text>
          <FlatList
            data={currencyList}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSelectCurrency(item)}>
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
}
