import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import {AddModelProps} from '../../types/types';
import {styles} from './addModelStyles';
import {useAddModel} from './useAddModel';

export default function AddModel({
  modalVisible,
  setModalVisible,
}: AddModelProps) {
  const {closeModal, goToExpense, goToIncome} = useAddModel(setModalVisible);

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <Animated.View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modelView}>
        <TouchableOpacity style={styles.pic1Box} onPress={goToIncome}>
          <Image source={IMAGES.WHITEINCOME} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pic2Box} onPress={goToExpense}>
          <Image source={IMAGES.WHITEEXPENSE} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
