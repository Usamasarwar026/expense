import React from 'react';
import AddModel from '../../components/addModel/AddModel';
import useAddModelScreen from './useAddModelScreen';

export default function AddModelScreen() {
  const {modalVisible, setModalVisible} = useAddModelScreen();

  return (
    <AddModel modalVisible={modalVisible} setModalVisible={setModalVisible} />
  );
}
