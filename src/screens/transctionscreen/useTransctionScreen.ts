import {Time} from '../../components/time/Time';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchTransactions} from '../../store/transctionSlice/transctionSlice';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {
  CombinedData,
  Transaction,
  TransactionDataSlice,
  TransactionFilters,
} from '../../types/types';
import {useEffect, useMemo, useState} from 'react';

export default function useTransctionScreen() {
  const [openModel, setOpenModel] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionDataSlice[]
  >([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [filters, setFilters] = useState<TransactionFilters>({
    type: null,
    sortBy: 'Highest',
    category: 'Choose Category',
  });
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(state => state.transctions) || [];

  useEffect(() => {
    if (!isFiltered) setFilteredTransactions(transactions);
  }, [transactions, isFiltered]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const groupedTransactions = isFiltered
    ? filteredTransactions
    : Time(transactions, selectedMonth);

  const nonEmptyPeriods = Object.keys(groupedTransactions).filter(
    period =>
      (groupedTransactions as Record<string, Transaction[]>)[period]?.length >
      0,
  );

  const goToFinancialReport = () => {
    navigate('FinancialReport');
  };

  const applyFilters = () => {
    let newFilteredTransactions = transactions.map(transaction => ({
      ...transaction,
      timestamp: new Date(transaction.timestamp as string).toISOString(),
    }));

    if (filters.type) {
      newFilteredTransactions = newFilteredTransactions.filter(
        transaction =>
          transaction.type?.toLowerCase() === filters.type?.toLowerCase(),
      );
    }

    if (filters.category && filters.category !== 'Choose Category') {
      newFilteredTransactions = newFilteredTransactions.filter(
        transaction =>
          transaction.category?.toLowerCase() ===
          filters.category?.toLowerCase(),
      );
    }

    const sortByMap: Record<string, (a: any, b: any) => number> = {
      Highest: (a, b) => b.amount - a.amount,
      Lowest: (a, b) => a.amount - b.amount,
      Newest: (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
      Oldest: (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    };

    if (filters.sortBy) {
      newFilteredTransactions.sort(sortByMap[filters.sortBy]);
    }

    setFilteredTransactions(newFilteredTransactions);
    setIsFiltered(true);
    setOpenModel(false);
  };

  const combinedData: CombinedData = useMemo(() => {
    return isFiltered
      ? filteredTransactions.map(transaction => ({
          type: 'transaction' as const,
          data: transaction,
        }))
      : nonEmptyPeriods.flatMap(period => [
          {type: 'header' as const, title: period},
          ...(groupedTransactions as Record<string, Transaction[]>)[period].map(
            transaction => ({
              type: 'transaction' as const,
              data: transaction,
            }),
          ),
        ]);
  }, [filteredTransactions, isFiltered, groupedTransactions, nonEmptyPeriods]);

  const resetFilters = () => {
    setFilteredTransactions(transactions);
    setIsFiltered(false);
    setFilters({
      type: null,
      sortBy: 'Highest',
      category: 'Choose Category',
    });
  };

  const handlepress = (transaction: Transaction) => {
    navigate('DetailTransction', {transaction});
  };

  return {
    handlepress,
    setSelectedMonth,
    openModel,
    setOpenModel,
    goToFinancialReport,
    combinedData,
    applyFilters,
    resetFilters,
    setFilters,
    filters,
  };
}
