import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  addTransaction,
  fetchExchangeRates,
  fetchSelectedCurrency,
  fetchTransactions,
} from '../../store/slices/transctionSlice/transctionSlice';
import Toast from 'react-native-toast-message';
import {convertAmount} from '../../utils/currencyUtils';

export default function useIncome() {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [successfullModel, setSuccessfulModel] = useState<boolean>(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('All Expense');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(state => state.transctions);
  const {selectedCurrency, exchangeRates} = useAppSelector(
    state => state.transctions,
  );
  const type = 'Income';

  useEffect(() => {
    dispatch(fetchSelectedCurrency());
  }, []);

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  useEffect(() => {
    if (transactions.length > 0) {
      const incomeTotal = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce(
          (sum, transaction) => sum + (Number(transaction.amount) || 0),
          0,
        );
      setTotalIncome(incomeTotal);
    }
  }, [transactions]);

  const saveData = () => {
    if (!description || !category || !amount || !imageUri) {
      Toast.show({
        text1: 'All fields are required',
        type: 'error',
      });
      return;
    }
    dispatch(addTransaction({description, category, amount, imageUri, type}));

    setDescription('');
    setCategory('Category');
    setAmount('');
    setImageUri(null);
    setSuccessfulModel(true);

    setTimeout(() => {
      setSuccessfulModel(false);
    }, 1000);
  };
  const goToHome = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const income = convertAmount(totalIncome, selectedCurrency, exchangeRates);

  return {
    goToHome,
    setCategory,
    description,
    setDescription,
    amount,
    setAmount,
    imageUri,
    setImageUri,
    openModel,
    setOpenModel,
    saveData,
    income,
    successfullModel,
    setSuccessfulModel,
  };
}
