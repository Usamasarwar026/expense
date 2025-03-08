import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  fetchExchangeRates,
  fetchSelectedCurrency,
} from '../../store/transctionSlice/transctionSlice';
import {convertAmount} from '../../utils/currencyUtils';

export function useTransction(amount: number, type: string) {
  const dispatch = useAppDispatch();
  const {selectedCurrency, exchangeRates} = useAppSelector(
    state => state.transctions,
  );

  useEffect(() => {
    dispatch(fetchSelectedCurrency());
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  const formattedAmount =
    type === 'Expense'
      ? `- ${convertAmount(amount, selectedCurrency, exchangeRates)}`
      : `+ ${convertAmount(amount, selectedCurrency, exchangeRates)}`;

  return {
    formattedAmount,
  };
}
