import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  addTransaction,
  fetchExchangeRates,
  fetchSelectedCurrency,
  fetchTransactions,
} from '../../store/transctionSlice/transctionSlice';
import Toast from 'react-native-toast-message';
import {convertAmount} from '../../utils/currencyUtils';
import {useNavigation} from '@react-navigation/native';

const useExpenseLogic = () => {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [successfullyModel, setSuccessfulModel] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('All Expense');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(state => state.transctions);
  const {selectedCurrency, exchangeRates} = useAppSelector(
    state => state.transctions,
  );
  const type = 'Expense';

  useEffect(() => {
    dispatch(fetchSelectedCurrency());
    dispatch(fetchExchangeRates());
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactions.length > 0) {
      const expenseTotal = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce(
          (sum, transaction) => sum + (Number(transaction.amount) || 0),
          0,
        );
      setTotalExpense(expenseTotal);
    }
  }, [transactions]);

  const ExpenseAmount = convertAmount(
    totalExpense,
    selectedCurrency,
    exchangeRates,
  );

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

  return {
    openModel,
    setOpenModel,
    successfullyModel,
    setSuccessfulModel,
    description,
    setDescription,
    category,
    setCategory,
    imageUri,
    setImageUri,
    amount,
    setAmount,
    saveData,
    ExpenseAmount,
    goToHome,
  };
};

export default useExpenseLogic;
