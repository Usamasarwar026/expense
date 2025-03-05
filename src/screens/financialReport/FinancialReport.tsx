import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMAGES} from '../../constant/image';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '../../components/progressBar/ProgressBar';
import Dropdown from '../../components/dropdown/Dropdown';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchTransactions} from '../../store/transctionSlice/transctionSlice';
import {styles} from './financialReportStyles';
import {navigate} from '../../navigation/navigationRef';
import {Transaction} from '../../types/types';
import PieChart from '../../components/pieChart/PieChart';

export default function FinancialReport() {
  const [selectedTab, setSelectedTab] = useState<'Expense' | 'Income'>(
    'Expense',
  );
  const [category, setCategory] = useState<string | null>(null);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(state => state.transctions);
  const [pieData, setPieData] = useState<{percentage: number; color: string}[]>(
    [],
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  useEffect(() => {
    if (transactions.length > 0) {
      const incomeTotal = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce(
          (sum, transaction) => sum + (Number(transaction.amount) || 0),
          0,
        );

      const expenseTotal = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce(
          (sum, transaction) => sum + (Number(transaction.amount) || 0),
          0,
        );

      setTotalIncome(incomeTotal);
      setTotalExpense(expenseTotal);
    }
  }, [transactions]);

  const goToTransction = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };
  const handlepress = (transaction: Transaction) => {
    navigate('DetailTransction', {transaction});
  };
  const toggleTab = (tab: 'Expense' | 'Income') => {
    setSelectedTab(tab);
  };
  const dataToDisplay = transactions?.filter((item: Transaction) => {
    return item?.type === selectedTab;
  });
  const maxAmount = Math.max(
    ...dataToDisplay.map(item => Number(item.amount)),
    1,
  );

  const totalAmount = selectedTab === 'Expense' ? totalExpense : totalIncome;

  useEffect(() => {
    const filteredTransactions = transactions.filter(
      t => t.type === selectedTab,
    );
    const totalAmount = selectedTab === 'Expense' ? totalExpense : totalIncome;

    if (totalAmount > 0) {
      const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + Number(transaction.amount);
        return acc;
      }, {} as Record<string, number>);

      const categoryColors: Record<string, string> = {
        Shopping: '#FCAC12',
        Subscription: '#7F3DFF',
        Food: '#007BFF',
        Salary: '#00A86B',
        Transportation: 'black',
        Other: '#BDC3C7',
      };
      const sections = Object.entries(categoryTotals).map(
        ([category, amount]) => ({
          percentage: (amount / totalAmount) * 100,
          color: categoryColors[category] || categoryColors.Other,
        }),
      );
      setPieData([]);
      setPieData([...sections]);
    } else {
      setPieData([]);
    }
  }, [selectedTab, transactions, totalIncome, totalExpense]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToTransction}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Financial Report</Text>
        </View>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Dropdown
              dropdownPosition="left"
              setSelectedMonth={setSelectedMonth}
            />
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.FRAME} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <PieChart radius={80} strokeWidth={30} sections={pieData} />
          <Text style={styles.imageContainerText}>{totalAmount}</Text>
        </View>
        <View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={selectedTab === 'Expense' ? styles.btn1 : styles.btn2}
              onPress={() => toggleTab('Expense')}>
              <Text
                style={
                  selectedTab === 'Expense' ? styles.btnText1 : styles.btnText2
                }>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={selectedTab === 'Income' ? styles.btn1 : styles.btn2}
              onPress={() => toggleTab('Income')}>
              <Text
                style={
                  selectedTab === 'Income' ? styles.btnText1 : styles.btnText2
                }>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <CategoryDropdown
              dropdownPosition="left"
              type={selectedTab}
              setCategory={setCategory}
            />
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.SORTING} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {dataToDisplay.map(item => {
            const maxAmount = 1000;
            const progress = Math.min((Number(item.amount) / maxAmount) * 100);
            const categoryColors: Record<string, string> = {
              Shopping: '#FCAC12',
              Subscription: '#7F3DFF',
              Food: '#007BFF',
              Salary: '#00A86B',
              Transportation: 'black',
            };
            const progressBarColor = categoryColors[item.category] || '#BDC3C7';
            const textColor = selectedTab === 'Expense' ? '#E74C3C' : '#2ECC71';
            return (
              <ProgressBar
                key={item.id}
                categoryName={item.category}
                amount={item.amount}
                progress={progress}
                color={progressBarColor}
                textColor={textColor}
                onPress={() => handlepress(item)}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
