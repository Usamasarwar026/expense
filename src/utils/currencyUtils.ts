export const convertAmount = (
  amount: number ,
  currency: string,
  exchangeRates: Record<string, number>,
) => {
  const rate = exchangeRates[currency] || 1;
  const convertedAmount = amount * rate;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  } catch (error) {
    console.error('Invalid currency format:', currency, error);
    return 'Invalid ';
  }
};
