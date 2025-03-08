import {useAppSelector} from '../../hooks/useRedux';
import {UseProgressBarProps} from '../../types/types';
import {convertAmount} from '../../utils/currencyUtils';

export default function useProgressBar({amount}: UseProgressBarProps) {
  const {selectedCurrency, exchangeRates} = useAppSelector(
    state => state.transctions,
  );
  const currencyAmount = convertAmount(
    Number(amount),
    selectedCurrency,
    exchangeRates,
  );
  return {
    currencyAmount,
  };
}
