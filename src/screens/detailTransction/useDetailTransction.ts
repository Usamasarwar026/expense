import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {deleteTransaction} from '../../store/slices/transctionSlice/transctionSlice';
import moment from 'moment';
import {DetailTransactionRouteProp, ParamTransaction} from '../../types/types';
import {convertAmount} from '../../utils/currencyUtils';

export const useDetailTransction = () => {
  const [openModel, setOpenModel] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const route = useRoute<DetailTransactionRouteProp>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const transaction: ParamTransaction = route.params?.transaction || {};
  const {selectedCurrency, exchangeRates} = useAppSelector(
    state => state.transctions,
  );
  const formattedDate = transaction.timestamp
    ? moment(transaction.timestamp).format('dddd D MMMM YYYY hh:mm A')
    : 'No Date Available';

  const goToHome = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const onYesPress = async (transactionId: string) => {
    await dispatch(deleteTransaction(transactionId));
  };

  const isExpense = transaction.type === 'Expense';

  const currencyAmount = convertAmount(
    transaction.amount,
    selectedCurrency,
    exchangeRates,
  );

  return {
    openModel,
    setOpenModel,
    fullScreenImage,
    setFullScreenImage,
    transaction,
    formattedDate,
    goToHome,
    onYesPress,
    currencyAmount,
    isExpense,
  };
};
