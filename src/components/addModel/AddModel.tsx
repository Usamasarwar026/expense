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
import {navigate} from '../../navigation/navigationRef';

export default function AddModel({
  modalVisible,
  setModalVisible,
}: AddModelProps) {

  const goToExpense = () => {
    navigate('Expense');
  };
  const goToIncome = () => {
    navigate('Income');
  };
  return (
    <>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}>
          <Animated.View style={[styles.overlay]} />
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
    </>
  );
}
