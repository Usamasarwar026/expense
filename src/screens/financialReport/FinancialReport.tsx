import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import ProgressBar from '../../components/progressBar/ProgressBar';
import { newTransaction, transactions } from '../home/TransctionData';
import Dropdown from '../../components/dropdown/Dropdown';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';


export default function FinancialReport() {
  const [selectedTab, setSelectedTab] = useState('Expense');
  const navigation = useNavigation();

  const goToTransction = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {name: 'TabNavigation', params: {screen: 'TransctionScreen'}},
          ],
        }),
      );
    } catch (error) {}
  };
  const handlepress = (transaction)=>{
    navigation.navigate('DetailTransction', {transaction});
  }
  const toggleTab = (tab:any) => {
    setSelectedTab(tab);
  };
  const dataToDisplay = selectedTab === 'Expense' ? transactions : newTransaction;
  const totalAmount = selectedTab === 'Expense' ? '$332' : '$520'; 
  const graph = selectedTab === 'Expense' ? IMAGES.YELLOWCIRCLE : IMAGES.GREENCIRCLE;
  

  return (
    <>
      <ScrollView style={style.container}>
        <View style={style.topcontainer}>
          <TouchableOpacity onPress={goToTransction}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={style.topcontainerText}>Financial Report</Text>
        </View>
        <View style={style.topBar}>
          <View style={style.topBarLeft}>
            {/* <Image source={IMAGES.ARROW_DOWN} />
            <Text>Month</Text> */}
            {

            }
            <Dropdown dropdownPosition='left'/>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.FRAME} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.imageContainer}>
          <Image style={style.img} source={graph} />
          <Text style={style.imageContainerText}>{totalAmount}</Text>
        </View>
        <View>
          <View style={style.btnContainer}>
            <TouchableOpacity style={selectedTab === 'Expense' ? style.btn1 :style.btn2} onPress={()=>toggleTab('Expense')}>
            <Text style={selectedTab === 'Expense' ? style.btnText1 :style.btnText2}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedTab === 'Income' ? style.btn1 : style.btn2} onPress={()=>toggleTab('Income')}>
            <Text style={selectedTab === 'Income' ? style.btnText1 :style.btnText2}>Income</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.topBar}>
          <View style={style.topBarLeft}>
            {/* <Image source={IMAGES.ARROW_DOWN} />
            <Text>Category</Text> */}
            {
              // selectedTab === 'Expense' ?   <CategoryDropdown dropdownPosition='left' type='Expense' /> : <CategoryDropdown dropdownPosition='left' type='Income' />
            }
            <CategoryDropdown  dropdownPosition='left' type={selectedTab}  /> 
          
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.SORTING} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
      {dataToDisplay.map((item) => (
        <ProgressBar
          key={item.id}
          categoryName={item.categoryName}
          amount={item.amount}
          progress={item.progress}
          color={item.color}
          textColor={item.textColor}
          onPress={()=>handlepress(item)}
        />
      ))}
    </View>
       
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topcontainerText: {
    fontSize: 16,
    fontWeight: '700',
    width: '70%',
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  topBarLeft: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 240,
    marginTop: 20,
  },
  img: {
    width: 192,
    height: 192,
  },
  imageContainerText: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: '700',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 0,
    marginHorizontal: 20,
    height: 48,
    borderRadius: 32,
    backgroundColor: '#EEE5FF',
    overflow: 'hidden',
    marginBottom: 15,
  },
  btn1: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 32,
    paddingVertical: 12,
    backgroundColor: '#7F3DFF',
    textAlign: 'center',
    color: '#fff',
  },
  btn2: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 32,
    paddingVertical: 12,
    // backgroundColor: '#EEE5FF',
    color: '#7F3DFF',
    textAlign: 'center',
  },
  btnText1: {
    textAlign: 'center',
    justifyContent: 'center',  
    alignItems: 'center',
    color: '#fff',      
  },
  btnText2: {
    textAlign: 'center',
    justifyContent: 'center',  
    alignItems: 'center',
    color: 'black'      
  },

  
  
});
