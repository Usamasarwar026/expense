import {useState, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchUserData} from '../../store/authSlice/authSlice';
import {
  fetchExchangeRates,
  fetchSelectedCurrency,
  fetchTransactions,
} from '../../store/transctionSlice/transctionSlice';
import moment from 'moment';
import {ChartData, Transaction, UserData} from '../../types/types';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {convertAmount} from '../../utils/currencyUtils';
import { COLORS } from '../../constant/color';

export function useHome() {
  const [userData, setUserData] = useState<UserData | null | undefined>(null);
  const [loader, setLoader] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions, selectedCurrency, exchangeRates} =
    useAppSelector(state => state.transctions);

  useEffect(() => {
    dispatch(fetchSelectedCurrency());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactions());
    const fetchUserInfo = async () => {
      try {
        const data = await dispatch(fetchUserData()).unwrap();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(transactions) && transactions.length > 0) {
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

  const filterTransactions = (): Transaction[] => {
    if (!Array.isArray(transactions)) {
      return [];
    }
    if (selectedFilter === 'All') return transactions;
    const now = new Date();
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.timestamp);
      switch (selectedFilter) {
        case 'Today':
          return transactionDate.toDateString() === now.toDateString();
        case 'Week': {
          const startOfWeek = new Date();
          startOfWeek.setDate(now.getDate() - now.getDay());
          return transactionDate >= startOfWeek;
        }
        case 'Month': {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          return (
            transactionDate >= startOfMonth && transactionDate <= endOfMonth
          );
        }
        case 'Year':
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredTransactions = filterTransactions();
  const expenseData = useMemo(() => {
    if (!Array.isArray(filteredTransactions)) return [];
    const individualExpenses = filteredTransactions
      .filter(transaction => transaction.type === 'Expense')
      .map(transaction => {
        const dateKey = moment(transaction.timestamp).format('YYYY-MM-DD');
        const numericAmount = parseFloat(transaction.amount);

        if (!dateKey) {
          console.error('Invalid timestamp:', transaction.timestamp);
          return null;
        }

        if (isNaN(numericAmount)) {
          console.error('Invalid amount detected:', transaction.amount);
          return null;
        }

        return {
          date: dateKey,
          amounts: numericAmount,
        };
      })
      .filter(entry => entry !== null);

    const sortedExpenses = individualExpenses.sort((a, b) =>
      moment(a.date).diff(moment(b.date)),
    );

    if (sortedExpenses.length < 2) {
      const today = moment().format('YYYY-MM-DD');
      sortedExpenses.unshift({date: today, amounts: 0});
    }
    return sortedExpenses;
  }, [filteredTransactions]);

  const data: ChartData = {
    labels: [],
    datasets: [
      {
        data: expenseData.map(entry => entry.amounts),
        color: (opacity = 1) => `rgba(127, 17, 244, ${opacity})`,
        strokeWidth: 4,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: COLORS.WHITE,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: COLORS.WHITE,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    fillShadowGradientFrom: COLORS.TRANSPARENT_PURPLE,
    fillShadowGradientTo: COLORS.TRANSPARENT_WHITE,
    fillShadowGradientOpacity: 0.3,
  };
  const handlepress = (transaction: Transaction) => {
    navigate('DetailTransction', {transaction});
  };
  const goToProfile = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabNavigation', params: {screen: 'Profile'}}],
        }),
      );
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const balance = convertAmount(
    totalIncome - totalExpense,
    selectedCurrency,
    exchangeRates,
  );
  const income = convertAmount(totalIncome, selectedCurrency, exchangeRates);
  const expense = convertAmount(totalExpense, selectedCurrency, exchangeRates);
  return {
    userData,
    loader,
    filteredTransactions,
    data,
    setSelectedFilter,
    selectedFilter,
    chartConfig,
    handlepress,
    goToProfile,
    filterTransactions,
    setSelectedMonth,
    balance,
    income,
    expense,
  };
}
