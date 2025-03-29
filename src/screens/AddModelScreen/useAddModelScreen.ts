import {useState} from 'react';

export default function useAddModelScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return {
    modalVisible,
    setModalVisible,
  };
}
