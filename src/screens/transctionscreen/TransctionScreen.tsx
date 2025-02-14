import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGES } from '../../constant/image';
import Transction from '../../components/transction/Transction';
import TransctionModel from '../../components/transctionModel/TransctionModel';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../../components/dropdown/Dropdown';
import { Time } from '../../components/time/Time';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchTransactions } from '../../store/transctionSlice/transctionSlice';
import moment from 'moment';
import { styles } from './transctionScreenStyles';
import { navigate } from '../../navigation/navigationRef';

export default function TransctionScreen() {
  const [openModel, setOpenModel] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);  
  const [category, setCategory] = useState('Choose Category');
  const [filters, setFilters] = useState({ type: null, sortBy: 'Highest', category: "Choose Category" });
  
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector((state) => state.transctions) ?? [];

  useEffect(() => {
    dispatch(fetchTransactions());
    console.log(transactions);
  }, [dispatch]);

  // Group transactions by time period
  const groupedTransactions = Time(transactions, selectedMonth);

  // Only keep periods that have transactions
  const nonEmptyPeriods = Object.keys(groupedTransactions).filter(
    (period) => groupedTransactions[period].length > 0
  );

  const goToFinancialReport = () => {
    navigate('FinancialReport');
  };

  

  return (
    <>
      <View style={{ flex: 1 }} >
        <View style={styles.container}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Dropdown dropdownPosition="left" setSelectedMonth={(month) => setSelectedMonth(month)} />
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.MENU} />
            </TouchableOpacity>
          </View>

          {/* Financial Report */}
          <TouchableOpacity onPress={goToFinancialReport}>
            <View style={styles.financialBox}>
              <Text style={styles.financialBoxText}>See your financial report</Text>
              <Image source={IMAGES.RIGHT_ARROW} />
            </View>
          </TouchableOpacity>

          {/* Render Transactions for Available Sections */}
          {nonEmptyPeriods.map((period) => (
            <View key={period}>
              {/* Section Title */}
              <View style={styles.periodHeader}>
                <Text style={styles.periodText}>{period}</Text>
              </View>

              {/* Render Transactions */}
              <FlatList
                style={styles.listbar}
                data={groupedTransactions[period]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Transction
                    title={item.category}
                    subtitle={item.description}
                    amount={item.amount}
                    time={moment(item.timestamp).format('hh:mm A')}
                    image={{ uri: item.imageUri }}
                    type={item.type}
                  />
                )}
              />
            </View>
          ))}
        </View>
      </View>

      {/* <TransctionModel visible={openModel} onClose={() => setOpenModel(false)} /> */}
      <TransctionModel visible={openModel} onClose={() => setOpenModel(false)} setCategory={setCategory} filters={filters} setFilters={setFilters} />

    </>
  );
}
