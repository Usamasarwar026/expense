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
import { styles } from './financialReportStyles';


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
      <ScrollView style={styles.container}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToTransction}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Financial Report</Text>
        </View>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Dropdown dropdownPosition='left' setSelectedMonth={setSelectedMonth}/>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.FRAME} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.img} source={graph} />
          <Text style={styles.imageContainerText}>{totalAmount}</Text>
        </View>
        <View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={selectedTab === 'Expense' ? styles.btn1 :styles.btn2} onPress={()=>toggleTab('Expense')}>
            <Text style={selectedTab === 'Expense' ? styles.btnText1 :styles.btnText2}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedTab === 'Income' ? styles.btn1 : styles.btn2} onPress={()=>toggleTab('Income')}>
            <Text style={selectedTab === 'Income' ? styles.btnText1 :styles.btnText2}>Income</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            
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
