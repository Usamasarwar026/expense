import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {CombinedData, TransactionFilters} from '../../types/types';

export default function TransctionScreen() {
  const [openModel, setOpenModel] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [category, setCategory] = useState('Choose Category');
  const [filters, setFilters] = useState<TransactionFilters>({
    type: null,
    sortBy: 'Highest',
    category: 'Choose Category',
  });
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(state => state.transctions) ?? [];

  useEffect(() => {
    dispatch(fetchTransactions());
    console.log(transactions);
  }, [dispatch]);

  const groupedTransactions = Time(transactions, selectedMonth);

  const nonEmptyPeriods = Object.keys(groupedTransactions).filter(
    period => groupedTransactions[period].length > 0,
  );

  const goToFinancialReport = () => {
    navigate('FinancialReport');
  };

  const applyFilters = () => {
    Alert.alert('Filters Has been Applied:');
  };

  const combinedData: CombinedData = nonEmptyPeriods.flatMap(period => [
    {type: 'header' as const, title: period},
    ...groupedTransactions[period].map(transaction => ({
      type: 'transaction' as const,
      data: transaction,
    })),
  ]);

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
              renderItem={({item}) =>
                item.type === 'header' ? (
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
                  />
                )
              }
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
        setFilters={setFilters}
      />
    </>
  );
}
