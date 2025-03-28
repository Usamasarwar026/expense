import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchTransactions} from '../../store/slices/transctionSlice/transctionSlice';
import {Transaction} from '../../types/types';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {convertAmount} from '../../utils/currencyUtils';
import {COLORS} from '../../constant/color';

export const useFinancialReport = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [pieData, setPieData] = useState<{percentage: number; color: string}[]>(
    [],
  );
  const [selectedTab, setSelectedTab] = useState<'Expense' | 'Income'>(
    'Expense',
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {transactions, selectedCurrency, exchangeRates} = useAppSelector(
    state => state.transctions,
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const incomeTotal = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce(
          (sum, transaction) => sum + (Number(transaction.amount) || 0),
          0,
        );

      const expenseTotal = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce(
          (sum, transaction) => sum + (Number(transaction.amount) || 0),
          0,
        );

      setTotalIncome(incomeTotal);
      setTotalExpense(expenseTotal);
    }
  }, [transactions]);

  const toggleTab = (tab: 'Expense' | 'Income') => {
    setSelectedTab(tab);
  };

  const handlepress = (transaction: Transaction) => {
    navigate('DetailTransction', {transaction});
  };

  const dataToDisplay = transactions?.filter((item: Transaction) => {
    return item?.type === selectedTab;
  });

  const maxAmount = Math.max(
    ...dataToDisplay.map(item => Number(item.amount)),
    1,
  );
  const totalAmount = selectedTab === 'Expense' ? totalExpense : totalIncome;
  const amount = convertAmount(totalAmount, selectedCurrency, exchangeRates);

  useEffect(() => {
    const filteredTransactions = transactions.filter(
      t => t.type === selectedTab,
    );
    const totalAmount = selectedTab === 'Expense' ? totalExpense : totalIncome;

    if (totalAmount > 0) {
      const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + Number(transaction.amount);
        return acc;
      }, {} as Record<string, number>);

      const categoryColors: Record<string, string> = {
        Shopping: COLORS.YELLOW_ORANGE,
        Subscription: COLORS.DARK_PURPLE,
        Food: COLORS.BRIGHT_BLUE,
        Salary: COLORS.GREEN,
        Transportation: COLORS.BLACK,
        Other: COLORS.SILVER_GRAY,
      };

      const sections = Object.entries(categoryTotals).map(
        ([category, amount]) => ({
          percentage: (amount / totalAmount) * 100,
          color: categoryColors[category] || categoryColors.Other,
        }),
      );

      setPieData(sections);
    } else {
      setPieData([]);
    }
  }, [selectedTab, transactions, totalIncome, totalExpense]);

  const goToTransction = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  return {
    selectedTab,
    pieData,
    toggleTab,
    handlepress,
    dataToDisplay,
    amount,
    goToTransction,
    maxAmount,
  };
};
