import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMAGES} from '../../constant/image';
import Transction from '../../components/transction/Transction';
// import {transactions} from './TransctionData';
import Dropdown from '../../components/dropdown/Dropdown';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchUserData} from '../../store/authSlice/authSlice';
import {fetchTransactions} from '../../store/transctionSlice/transctionSlice';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Today'); 
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions, loading} = useAppSelector(state => state.transctions);

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

  const filterTransactions = () => {
    if (!Array.isArray(transactions)) {
      return []; // Return an empty array if transactions is undefined or not an array
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
          startOfWeek.setDate(now.getDate() - now.getDay()); // Start of the current week (Sunday)
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


  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      bounces={false}>
      <View style={style.container}>
        <View style={style.top}>
          <View style={style.innertop}>
            <TouchableOpacity style={style.picbox} onPress={goToProfile}>
              {loading ? (
                <ActivityIndicator size="small" color="#7F3DFF" />
              ) : (
                <Image
                  source={
                    userData?.profileImageUri
                      ? {uri: userData.profileImageUri}
                      : IMAGES.PROFILE
                  }
                  style={style.picboximage}
                />
              )}
            </TouchableOpacity>
            <View style={style.dropdown}>
              <Dropdown dropdownPosition="center" />
            </View>
            <Image source={IMAGES.NOTIFICATION} />
          </View>
        </View>
        <View>
          <View>
            <Text style={style.blnc}>Account Balance</Text>
          </View>
          <View>
            <Text style={style.blncamount}>$9400</Text>
          </View>
          <View style={style.parentbox}>
            <View style={style.balanceBox}>
              <View style={style.imageBox}>
                <Image source={IMAGES.INCOME} />
              </View>
              <View>
                <Text style={style.parentText}>Income</Text>
                <Text style={style.parentAmount}>$5000</Text>
              </View>
            </View>
            <View style={style.balanceBox1}>
              <View style={style.imageBox}>
                <Image source={IMAGES.EXPENSE} />
              </View>
              <View>
                <Text style={style.parentText}>Expenses</Text>
                <Text style={style.parentAmount}>$1200</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={style.thirdcontainer}>
          <Text style={style.thirdcontainerText}>Spend Frequency</Text>
        </View>
        <View style={style.graphcontainer}>
          <Image resizeMode="contain" source={IMAGES.GRAPH} />
        </View>
        
        {/* Filters for Transactions */}
        <View style={style.daybar}>
          {['Today', 'Week', 'Month', 'Year'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                style.filterButton,
                selectedFilter === filter ? style.selectedFilter : null,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  style.filterText,
                  selectedFilter === filter ? style.selectedFilterText : null,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions List */}
        <View style={style.recentBar}>
          <Text style={style.recentBarText1}>Recent Transaction</Text>
          <TouchableOpacity onPress={() => setSelectedFilter('All')}>
            <Text style={style.recentBarText2}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={style.listbar}>
          {filterTransactions().length === 0 ? (
            <View style={style.listtextBox}>
              <Text style={style.listtext}>No transactions found.</Text>
            </View>
          ) : (
            <FlatList
              nestedScrollEnabled={true}
              style={style.listbar}
              data={filterTransactions()}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({ item }) => {
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
                    image={{ uri: item.imageUri }}
                  />
                );
              }}
            />
          )}
        </View>



      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innertop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 343,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdown: {
    // backgroundColor: '#FCEED4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#7F3DFF',
    marginLeft: 10,
  },
  picbox: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#7F3DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picboximage: {
    width: 33,
    height: 33,
    borderRadius: 50,
  },

  blnc: {
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',
    textAlign: 'center',
  },
  blncamount: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  parentbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  balanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#00A86B',
    width: 164,
    height: 80,
    borderRadius: 28,
  },
  balanceBox1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FD3C4A',
    width: 164,
    height: 80,
    borderRadius: 28,
  },
  parentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  parentAmount: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
  },
  thirdcontainer: {
    // flex: 1,
    paddingTop: 10,
  },
  thirdcontainerText: {
    // flex: 1,
    paddingTop: 10,

    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  graphcontainer: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  daybar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  barbox: {
    // flex:0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCEED4',
    borderRadius: 20,
    height: 34,
    width: 90,
  },
  barbox1: {
    // flex:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 34,
    width: 90,
  },
  recentBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  recentBarText1: {
    fontSize: 18,
    fontWeight: '600',
  },
  recentBarText2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F3DFF',
    backgroundColor: '#EEE5FF',
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 8,

    borderRadius: 20,
    textAlign: 'center',
  },
  listbar: {
    flex: 3,
    flexDirection: 'column',
    marginBottom: 30,
  },
  listtext:{
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: 'center',
    marginBottom: 30,
    // borderWidth: 1,
  },
  listtextBox: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    // borderWidth: 1,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 34,
    width: 90,
  },
  selectedFilter: {
    backgroundColor: '#FCEED4',
  },
  filterText: {
    color: '#91919F',
  },
  selectedFilterText: {
    color: '#FCAC12',
  },
});
