import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';

export default function useTabNavigation() {
  const [modalVisible, setModalVisible] = useState(false);
  const Tab = createBottomTabNavigator();
  return {
    modalVisible,
    setModalVisible,
    Tab,
  };
}
