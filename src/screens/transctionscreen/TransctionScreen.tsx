import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {IMAGES} from '../../constant/image';
import Transction from '../../components/transction/Transction';
import TransctionModel from '../../components/transctionModel/TransctionModel';
import Dropdown from '../../components/dropdown/Dropdown';
import {Time} from '../../components/time/Time';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchTransactions} from '../../store/transctionSlice/transctionSlice';
import moment from 'moment';
import {styles} from './transctionScreenStyles';
import {navigate} from '../../navigation/navigationRef';
import {
  CombinedData,
  Transaction,
  TransactionDataSlice,
  TransactionFilters,
} from '../../types/types';

export default function TransctionScreen() {
  const [openModel, setOpenModel] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [category, setCategory] = useState('Choose Category');
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
  const renderTransactionItem = ({item}: {item: CombinedData[number]}) => {
    return item.type === 'header' ? (
      <View style={styles.periodHeader}>
        <Text style={styles.periodText}>{item.title}</Text>
      </View>
    ) : (
      <Transction
        title={item.data.category}
        subtitle={item.data.description}
        amount={item.data.amount}
        time={moment(item.data.timestamp).format('hh:mm A')}
        image={{uri: item.data.imageUri}}
        type={item.data.type}
        onPress={() => {
          handlepress(item.data);
        }}
      />
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Dropdown
              dropdownPosition="left"
              setSelectedMonth={month => setSelectedMonth(month)}
            />
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.MENU} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={goToFinancialReport}>
            <View style={styles.financialBox}>
              <Text style={styles.financialBoxText}>
                See your financial report
              </Text>
              <Image source={IMAGES.RIGHT_ARROW} />
            </View>
          </TouchableOpacity>
          <View>
            <FlatList
              data={combinedData}
              keyExtractor={(item, index) =>
                item.type === 'header'
                  ? `header-${item.title}`
                  : item.data.id.toString()
              }
              renderItem={renderTransactionItem}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              removeClippedSubviews={true}
            />
          </View>
        </View>
      </View>

      <TransctionModel
        visible={openModel}
        onClose={() => setOpenModel(false)}
        setCategory={setCategory}
        filters={filters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        setFilters={setFilters}
      />
    </>
  );
}
