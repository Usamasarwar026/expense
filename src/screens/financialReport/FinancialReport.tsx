import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import ProgressBar from '../../components/progressBar/ProgressBar';
// import { newTransaction, transactions } from '../home/TransctionData';
import Dropdown from '../../components/dropdown/Dropdown';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchTransactions } from '../../store/transctionSlice/transctionSlice';


export default function FinancialReport() {
  const [selectedTab, setSelectedTab] = useState('Expense');
  const [category, setCategory] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);  
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions, loading} = useAppSelector(state => state.transctions);
  
  useEffect(()=>{
    dispatch(fetchTransactions());
    console.log(transactions)
  },[dispatch])
  useEffect(() => {
      if (transactions.length > 0) {
        const incomeTotal = transactions
          .filter((transaction) => transaction.type === 'Income')
          .reduce((sum, transaction) => sum + (Number(transaction.amount) || 0), 0);  // Ensure number conversion
    
        const expenseTotal = transactions
          .filter((transaction) => transaction.type === 'Expense')
          .reduce((sum, transaction) => sum + (Number(transaction.amount) || 0), 0);  // Ensure number conversion
    
        console.log("Total Income:", incomeTotal);
        console.log("Total Expense:", expenseTotal);
    
        setTotalIncome(incomeTotal);
        setTotalExpense(expenseTotal);
      }
    }, [transactions]); 

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
    console.log("Pressed Transaction:", transaction);
    navigation.navigate('DetailTransction', {transaction});

  }
  const toggleTab = (tab:any) => {
    setSelectedTab(tab);
  };
  const dataToDisplay = transactions?.filter(item => {
    // console.log("Filtering Item:", item);
    return item?.type === selectedTab;
  });
  // console.log("Data to Display after filtering:", dataToDisplay);
  const maxAmount = Math.max(...dataToDisplay.map(item => item.amount), 1);
        const adjustedMaxAmount = maxAmount * 0.8;
  
  // const dataToDisplay = selectedTab === 'Expense' ? transactions : newTransaction;
  // const dataToDisplay = transactions.filter(item => item.type === selectedTab);
  const totalAmount = selectedTab === 'Expense' ? totalExpense : totalIncome; 
  const graph = selectedTab === 'Expense' ? IMAGES.YELLOWCIRCLE : IMAGES.GREENCIRCLE;
  // console.log("Data to Display:", dataToDisplay);

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
            <Dropdown dropdownPosition='left' setSelectedMonth={setSelectedMonth}/>
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
            
            <CategoryDropdown  dropdownPosition='left' type={selectedTab} setCategory={setCategory} /> 
          
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.SORTING} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
      {dataToDisplay.map((item) =>{
        
        const progress = Math.min((item.amount / adjustedMaxAmount) * 100, 100);
        const categoryColors = {
          Shopping: '#FCAC12',
          Subscription: '#7F3DFF',
          Food: '#007BFF',
          Salary: '#00A86B',
          Transportation: 'black'
        };
        const progressBarColor = categoryColors[item.category] || '#BDC3C7';
        const textColor = selectedTab === 'Expense' ? '#E74C3C' : '#2ECC71';
      return(
        <ProgressBar
          key={item.id}
          categoryName={item.category}
          amount={item.amount}
          progress={progress}
          color={progressBarColor}
          textColor={textColor}
          onPress={()=>handlepress(item)}
        />
      )})}
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
