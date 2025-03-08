import { useCallback } from 'react';
import { navigate } from '../../navigation/navigationRef/navigationRef';

export function useAddModel(setModalVisible: (visible: boolean) => void){
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const goToExpense = useCallback(() => {
    navigate('Expense');
  }, []);

  const goToIncome = useCallback(() => {
    navigate('Income');
  }, []);

  return { closeModal, goToExpense, goToIncome };
};
