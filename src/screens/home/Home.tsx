import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {IMAGES} from '../../constant/image';
import Transction from '../../components/transction/Transction';
import Dropdown from '../../components/dropdown/Dropdown';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchUserData} from '../../store/authSlice/authSlice';
import {
  fetchExchangeRates,
  fetchSelectedCurrency,
  fetchTransactions,
} from '../../store/transctionSlice/transctionSlice';
import {styles} from './homeStyle';
import {ChartData, Transaction, UserData} from '../../types/types';
import {navigate} from '../../navigation/navigationRef';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const width = Dimensions.get('window').width + 120;

export default function Home() {
  const [userData, setUserData] = useState<UserData | null | undefined>(null);
  const [loader, setLoader] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions, loading, selectedCurrency, exchangeRates} =
    useAppSelector(state => state.transctions);

    
    useEffect(() => {
      dispatch(fetchSelectedCurrency());
  }, []);

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactions());
    const fetchUserInfo = async () => {
      try {
        const data = await dispatch(fetchUserData()).unwrap();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(transactions) && transactions.length > 0) {
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

  const goToProfile = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabNavigation', params: {screen: 'Profile'}}],
        }),
      );
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const convertAmount = (amount: number, currency: string) => {
    if (!currency) {
      console.error('Currency is required but received:', currency);
      return 'Invalid currency';
    }
    const rate = exchangeRates[currency] ?? 1;
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
  const handlepress = (transaction: Transaction) => {
    navigate('DetailTransction', {transaction});
  };

  const filterTransactions = (): Transaction[] => {
    if (!Array.isArray(transactions)) {
      return [];
    }

    if (selectedFilter === 'All') return transactions;
    const now = new Date();
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.timestamp);
      switch (selectedFilter) {
        case 'Today':
          return transactionDate.toDateString() === now.toDateString();
        case 'Week': {
          const startOfWeek = new Date();
          startOfWeek.setDate(now.getDate() - now.getDay());
          return transactionDate >= startOfWeek;
        }
        case 'Month': {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

          return (
            transactionDate >= startOfMonth && transactionDate <= endOfMonth
          );
        }
        case 'Year':
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredTransactions = filterTransactions();

  const expenseData = useMemo(() => {
    if (!Array.isArray(filteredTransactions)) return [];
    const individualExpenses = filteredTransactions
      .filter(transaction => transaction.type === 'Expense')
      .map(transaction => {
        const dateKey = moment(transaction.timestamp).format('YYYY-MM-DD');
        const numericAmount = parseFloat(transaction.amount);

        if (!dateKey) {
          console.error('Invalid timestamp:', transaction.timestamp);
          return null;
        }

        if (isNaN(numericAmount)) {
          console.error('Invalid amount detected:', transaction.amount);
          return null;
        }

        return {
          date: dateKey,
          amounts: numericAmount,
        };
      })
      .filter(entry => entry !== null);

    const sortedExpenses = individualExpenses.sort((a, b) =>
      moment(a.date).diff(moment(b.date)),
    );

    if (sortedExpenses.length < 2) {
      const today = moment().format('YYYY-MM-DD');
      sortedExpenses.unshift({date: today, amounts: 0});
    }
    return sortedExpenses;
  }, [filteredTransactions]);

  const data:ChartData = {
    labels: [],
    datasets: [
      {
        data: expenseData.map(entry => entry.amounts),
        color: (opacity = 1) => `rgba(127, 17, 244, ${opacity})`,
        strokeWidth: 4,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    fillShadowGradientFrom: 'rgba(159, 120, 235, 0.6)',
    fillShadowGradientTo: 'rgba(255, 255, 255, 0)',
    fillShadowGradientOpacity: 0.3,
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.innertop}>
            <TouchableOpacity style={styles.picbox} onPress={goToProfile}>
              {loading ? (
                <ActivityIndicator size="small" color="#7F3DFF" />
              ) : (
                <Image
                  source={
                    userData?.profileImageUri
                      ? {uri: userData.profileImageUri}
                      : IMAGES.PROFILE
                  }
                  style={styles.picboximage}
                />
              )}
            </TouchableOpacity>
            <View style={styles.dropdown}>
              <Dropdown
                dropdownPosition="center"
                setSelectedMonth={month => setSelectedMonth(month)}
              />
            </View>
            <Image source={IMAGES.NOTIFICATION} />
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.blnc}>Account Balance</Text>
          </View>
          <View>
            <Text style={styles.blncamount}>
              {convertAmount(totalIncome - totalExpense, selectedCurrency)}
            </Text>
          </View>
          <View style={styles.parentbox}>
            <View style={styles.balanceBox}>
              <View style={styles.imageBox}>
                <Image source={IMAGES.INCOME} />
              </View>
              <View>
                <Text style={styles.parentText}>Income</Text>
                <Text style={styles.parentAmount}>
                  {convertAmount(totalIncome, selectedCurrency)}
                </Text>
              </View>
            </View>
            <View style={styles.balanceBox1}>
              <View style={styles.imageBox}>
                <Image source={IMAGES.EXPENSE} />
              </View>
              <View>
                <Text style={styles.parentText}>Expenses</Text>
                <Text style={styles.parentAmount}>
                  {convertAmount(totalExpense, selectedCurrency)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.thirdcontainer}>
          <Text style={styles.thirdcontainerText}>Spend Frequency</Text>
        </View>
        <View style={styles.graphcontainer}>
          <LineChart
            data={data}
            width={width}
            height={200}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withDots={false}
            bezier
          />
        </View>

        <View style={styles.daybar}>
          {['Today', 'Week', 'Month', 'Year'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter ? styles.selectedFilter : null,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter ? styles.selectedFilterText : null,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recentBar}>
          <Text style={styles.recentBarText1}>Recent Transaction</Text>
          <TouchableOpacity onPress={() => setSelectedFilter('All')}>
            <Text style={styles.recentBarText2}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listbar}>
          {filterTransactions().length === 0 ? (
            <View style={styles.listtextBox}>
              <Text style={styles.listtext}>No transactions found.</Text>
            </View>
          ) : (
            <FlatList
              nestedScrollEnabled={true}
              style={styles.listbar}
              data={filterTransactions()}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({item}) => {
                let timeString = '--:--';
                if (item.timestamp) {
                  let dateObj = new Date(item.timestamp);
                  if (!isNaN(dateObj.getTime())) {
                    timeString = dateObj.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    });
                  }
                }
                return (
                  <Transction
                    title={item.category}
                    subtitle={item.description}
                    amount={item.amount}
                    time={timeString}
                    image={{uri: item.imageUri}}
                    type={item.type}
                    onPress={() => handlepress(item)}
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
