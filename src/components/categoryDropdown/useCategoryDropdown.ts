import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { EXPENSE_DATA, INCOME_DATA } from '../../constant/constant';

export function useCategoryDropdown(type: string, setCategory: (value: string) => void) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [listVisible, setListVisible] = useState<boolean>(false);

  const allData = [...EXPENSE_DATA, ...INCOME_DATA];
  const dropdownData =
    type === 'All' ? allData : type === 'Expense' ? EXPENSE_DATA : INCOME_DATA;

  useEffect(() => {
    setListVisible(false);
  }, [type]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setListVisible(false);
        setSelectedValue('Category');
      };
    }, [])
  );

  const toggleDropdown = () => setListVisible(!listVisible);

  const selectCategory = (value: string) => {
    setSelectedValue(value);
    setCategory(value);
    setListVisible(false);
  };

  return { selectedValue, listVisible, dropdownData, toggleDropdown, selectCategory };
}
