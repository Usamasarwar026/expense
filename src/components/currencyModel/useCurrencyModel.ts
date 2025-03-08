import {useState} from 'react';
import {CURRENCY_LIST} from '../../constant/constant';

export function useCurrencyModal(onSelectCurrency: (currency: string) => void) {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleSelectCurrency = (currency: string) => {
    onSelectCurrency(currency);
    closeModal();
  };

  return {
    visible,
    openModal,
    closeModal,
    handleSelectCurrency,
    currencyList: CURRENCY_LIST,
  };
}
