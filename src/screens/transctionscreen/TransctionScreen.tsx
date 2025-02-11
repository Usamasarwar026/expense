import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
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

export default function TransctionScreen() {
  const [openModel, setOpenModel] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);  // Default: Current month

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector((state) => state.transctions);

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
    navigation.navigate('FinancialReport');
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={style.container}>
          {/* Top Bar */}
          <View style={style.topBar}>
            <Dropdown dropdownPosition="left" setSelectedMonth={(month) => setSelectedMonth(month)} />
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.MENU} />
            </TouchableOpacity>
          </View>

          {/* Financial Report */}
          <TouchableOpacity onPress={goToFinancialReport}>
            <View style={style.financialBox}>
              <Text style={style.financialBoxText}>See your financial report</Text>
              <Image source={IMAGES.RIGHT_ARROW} />
            </View>
          </TouchableOpacity>

          {/* Render Transactions for Available Sections */}
          {nonEmptyPeriods.map((period) => (
            <View key={period}>
              {/* Section Title */}
              <View style={style.periodHeader}>
                <Text style={style.periodText}>{period}</Text>
              </View>

              {/* Render Transactions */}
              <FlatList
                style={style.listbar}
                data={groupedTransactions[period]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Transction
                    title={item.category}
                    subtitle={item.description}
                    amount={item.amount}
                    time={moment(item.timestamp).format('hh:mm A')}
                    image={{ uri: item.imageUri }}
                  />
                )}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <TransctionModel visible={openModel} onClose={() => setOpenModel(false)} />
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  financialBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#EEE5FF',
    marginTop: 20,
  },
  financialBoxText: {
    color: '#7F3DFF',
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 15,
  },
  periodHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  periodText: {
    fontSize: 18,
    fontWeight: '600',
  },
  listbar: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
});
