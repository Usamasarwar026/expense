import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import Transction from '../../components/transction/Transction';
import { transactions } from './TransctionData';
import AddTransactionButton from '../../components/addButton/AddButton';

export default function Home() {
  return (
    <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}  bounces={false}>
    <View style={style.container}>
      <View style={style.top}>
        <View style={style.innertop}>
          <Image source={IMAGES.PROFILE} />
          <View style={style.txtimage}>
            <Image source={IMAGES.ARROW_DOWN} />
            <Text>October</Text>
          </View>
          <Image source={IMAGES.NOTIFICATION} />
        </View>
      </View>
      <View >
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
        <Text  style={style.thirdcontainerText}>Spend Frequency</Text>
      </View>
      <View style={style.graphcontainer}>
        <Image resizeMode="contain" source={IMAGES.GRAPH}/>
      </View>
      <View style={style.daybar}>
        <View style={style.barbox}>
        <Text style={style.bar1}>Today</Text>
        </View>
        <View style={style.barbox1}>
        <Text style={style.bar2}>Week</Text>
        </View>
        <View style={style.barbox1}>
        <Text style={style.bar2}>Month</Text>
        </View>
        <View style={style.barbox1}>
        <Text style={style.bar2}>Year</Text>
        </View>
      </View>
      <View style={style.recentBar}>
        <View>
            <Text  style={style.recentBarText1}>Recent Transaction</Text>
        </View>
        <View>
            <Text style={style.recentBarText2}>See All</Text>
        </View>
      </View>
      <View style={style.listbar}>
        
      <ScrollView style={style.listbar}>
      {transactions.map((transaction) => (
        <Transction
          key={transaction.id}
          title={transaction.title}
          subtitle={transaction.subtitle}
          amount={transaction.amount}
          time={transaction.time}
          image={transaction.image}
        />
      ))}
    </ScrollView>
    <AddTransactionButton/>
        
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
    // flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 10,
  },
  innertop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 343,
    paddingHorizontal: 20,
  },
  txtimage: {
    flexDirection: 'row',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-around',
    paddingHorizontal: 20,
  },
  bar1: {
    
    color: '#FCAC12',
    
},
bar2: {
    color: '#91919F',
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
  recentBar:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 20,
    marginTop:15,
    
  },
  recentBarText1:{
    fontSize: 18,
    fontWeight: '600',
  },
  recentBarText2:{
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
  listbar:{
    // flex: 3,
    flexDirection: 'column',
    marginTop:15,
    marginBottom: 30,
    
  }
  
});
