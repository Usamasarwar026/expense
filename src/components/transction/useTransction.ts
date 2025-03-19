import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  fetchExchangeRates,
  fetchSelectedCurrency,
} from '../../store/slices/transctionSlice/transctionSlice';
import {convertAmount} from '../../utils/currencyUtils';

export function useTransction(amount: number | string, type: string) {
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
      ? `- ${convertAmount(Number(amount), selectedCurrency, exchangeRates)}`
      : `+ ${convertAmount(Number(amount), selectedCurrency, exchangeRates)}`;

  return {
    formattedAmount,
  };
}
