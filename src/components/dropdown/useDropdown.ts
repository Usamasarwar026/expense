import {useState, useCallback} from 'react';
import {MONTH} from '../../constant/constant';

export function useDropdown(setSelectedMonth: (month: string) => void) {
  const [selectedValue, setSelectedValue] = useState<string | null>('Month');
  const [listVisible, setListVisible] = useState<boolean>(false);

  const toggleList = () => setListVisible(prev => !prev);

  const handleSelectMonth = (month: string) => {
    setSelectedValue(month);
    setSelectedMonth(month);
    setListVisible(false);
  };

  const resetDropdown = useCallback(() => {
    setSelectedValue('Month');
    setListVisible(false);
  }, []);

  return {
    selectedValue,
    listVisible,
    toggleList,
    handleSelectMonth,
    resetDropdown,
    months: MONTH,
  };
}
