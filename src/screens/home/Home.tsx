import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {Transaction, UserData} from '../../types/types';

export default function Home() {
  const [userData, setUserData] = useState<UserData | null | undefined>(null);
  const [loader, setLoader] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions, loading} = useAppSelector(state => state.transctions);
  const selectedCurrency = useAppSelector(
    state => state.transctions.selectedCurrency,
  );
  const exchangeRates = useAppSelector(
    state => state.transctions.exchangeRates,
  );

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
          return (
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear()
          );
        }
        case 'Year':
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const convertAmount = (amount: number, currency: string) => {
    if (!currency) {
      console.error("Currency is required but received:", currency);
      return "Invalid currency";
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
      console.error("Invalid currency format:", currency, error);
      return "Invalid ";
    }
  };
  


  return (
    <View style={{flex: 1}}>
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
          <Image
            resizeMode="contain"
            style={{width: '100%'}}
            source={IMAGES.GRAPH}
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
