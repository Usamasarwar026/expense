import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {IMAGES} from '../../constant/image';
import Transction from '../../components/transction/Transction';
import {newTransaction, transactions} from '../home/TransctionData';
import TransctionModel from '../../components/transctionModel/TransctionModel';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../../components/dropdown/Dropdown';

export default function TransctionScreen() {
  const [openModel, setOpenModel] = useState(false);
  const navigation = useNavigation();
  

  const goToFinancialReport = ()=>{
    navigation.navigate('FinancialReport');
  }
  return (
    <>
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} bounces={false}>
    <View style={style.container}>
      <View style={style.topBar}>
        <View style={style.topBarLeft}>
          {/* <Image source={IMAGES.ARROW_DOWN} />
          <Text>Month</Text> */}
          <Dropdown dropdownPosition="left"/>
        </View>
        <View>
          <TouchableOpacity onPress={()=>{setOpenModel(true)}}>
          <Image source={IMAGES.MENU} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={goToFinancialReport}>
      <View style={style.financialBox} >
        <Text style={style.financialBoxText}>See your financial report</Text>
        <Image source={IMAGES.RIGHT_ARROW} />
      </View>
      </TouchableOpacity>
      <View style={style.today}>
        <Text style={style.todayText}>Today</Text>
      </View>
      <View style={style.list}>
        <ScrollView style={style.listbar}>
          {transactions.map(transaction => (
            <Transction
              key={transaction.id}
              title={transaction.categoryName}
              subtitle={transaction.subtitle}
              amount={transaction.amount}
              time={transaction.time}
              image={transaction.image}
            />
          ))}
        </ScrollView>
      </View>
      <View style={style.today}>
        <Text style={style.todayText}>Yesterday</Text>
      </View>
      <View style={style.list}>
        <ScrollView style={style.listbar1}>
          {newTransaction.map(transaction =>{   
            return(
              <Transction
                key={transaction.id}
                title={transaction.categoryName}
                subtitle={transaction.subtitle}
                amount={transaction.amount}
                time={transaction.time}
                image={transaction.image}
                
              />
            )
          } )}
        </ScrollView>
      </View>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  topBarLeft: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  financialBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,

    justifyContent: 'space-between',
    // borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#EEE5FF',
    marginTop: 20
  },
  financialBoxText: {
    color: '#7F3DFF',
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 15,
},
today: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    // borderWidth: 1,
  },
  todayText: {
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  listbar: {
    // flex: 3,
    flexDirection: 'column',
    // marginTop:1,
    // marginBottom: 30,
  },
  listbar1: {
    // flex: 3,
    flexDirection: 'column',
    // marginTop:1,
    marginBottom: 50,
  },
});
