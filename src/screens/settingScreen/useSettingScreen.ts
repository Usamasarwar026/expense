import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {saveSelectedCurrency} from '../../store/slices/transctionSlice/transctionSlice';
import {useState} from 'react';

export default function useSettingScreen() {
  const Navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const selectedCurrency = useAppSelector(
    state => state.transctions.selectedCurrency,
  );

  const goToBack = () => {
    try {
      Navigation.goBack();
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const handleCurrencySelect = async (currency: string) => {
    await dispatch(saveSelectedCurrency(currency));
    setModalVisible(false);
  };
  return {
    goToBack,
    modalVisible,
    setModalVisible,
    selectedCurrency,
    handleCurrencySelect,
  };
}
