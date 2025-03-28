import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import Transction from '../../components/transction/Transction';
import Dropdown from '../../components/dropdown/Dropdown';
import {styles} from './homeStyle';
import {LineChart} from 'react-native-chart-kit';
import {useHome} from './useHome';
import {COLORS} from '../../constant/color';

const width = Dimensions.get('window').width + 115;

export default function Home() {
  const {
    userData,
    loader,
    data,
    setSelectedFilter,
    selectedFilter,
    chartConfig,
    handlepress,
    goToProfile,
    filterTransactions,
    balance,
    income,
    expense,
  } = useHome();
  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <View style={styles.topback}>
          <View style={styles.top}>
            <View style={styles.innertop}>
              <TouchableOpacity style={styles.picbox} onPress={goToProfile}>
                {loader ? (
                  <ActivityIndicator size="small" color={COLORS.DARK_PURPLE} />
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
              <Text style={styles.blncamount}>{balance}</Text>
            </View>
            <View style={styles.parentbox}>
              <View style={styles.balanceBox}>
                <View style={styles.imageBox}>
                  <Image source={IMAGES.INCOME} />
                </View>
                <View>
                  <Text style={styles.parentText}>Income</Text>
                  <Text style={styles.parentAmount}>{income}</Text>
                </View>
              </View>
              <View style={styles.balanceBox1}>
                <View style={styles.imageBox}>
                  <Image source={IMAGES.EXPENSE} />
                </View>
                <View>
                  <Text style={styles.parentText}>Expenses</Text>
                  <Text style={styles.parentAmount}>{expense}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
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
          {['Today', 'Week', 'Month', 'Year']?.map(filter => (
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
          {filterTransactions()?.length === 0 ? (
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
