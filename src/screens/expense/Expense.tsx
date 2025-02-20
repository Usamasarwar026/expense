import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AttachmentModel from '../../components/attachmentModel/AttachmentModel';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import Input from '../../components/input/Input';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  addTransaction,
  fetchExchangeRates,
  fetchSelectedCurrency,
  fetchTransactions,
} from '../../store/transctionSlice/transctionSlice';
import SuccessfulModel from '../../components/successfulModel/SuccessfulModel';
import Toast from 'react-native-toast-message';
import {styles} from './expenseStyles';

export default function Expense() {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [successfullyModel, setSuccessfulModel] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('All Expense');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(state => state.transctions);
  const type = 'Expense';
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
    
      
    const convertAmount = (amount: number, currency: string) => {
      const rate = exchangeRates[currency] || 1;
      const convertedAmount = amount * rate;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(convertedAmount);
    };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactions.length > 0) {
      const expenseTotal = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce(
          (sum, transaction) => sum + (Number(transaction.amount) || 0),
          0,
        );
      setTotalExpense(expenseTotal);
    }
  }, [transactions]);
  const saveData = () => {
    if (!description || !category || !amount || !imageUri) {
      Toast.show({
        text1: 'All fields are required',
        type: 'error',
      });

      return;
    }

    dispatch(addTransaction({description, category, amount, imageUri, type}));
    setDescription('');
    setCategory('Category');
    setAmount('');
    setImageUri(null);
    setSuccessfulModel(true);

    setTimeout(() => {
      setSuccessfulModel(false);
    }, 1000);
  };
  const goToHome = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabNavigation', params: {screen: 'Home'}}],
        }),
      );
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToHome}>
            <Image source={IMAGES.WHITEARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Expense</Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.secondContainerText}>How much?</Text>
          <Text style={styles.secondContaineramount}>{convertAmount(totalExpense, selectedCurrency)}</Text>
        </View>
        <View style={styles.belowContainer}>
          <View style={styles.belowinnerContainer}>
            <CategoryDropdown
              dropdownPosition="center"
              style="AllExpense"
              type="Expense"
              setCategory={setCategory}
            />
          </View>
          <View style={styles.textareaBox}>
            <TextInput
              style={styles.textArea}
              placeholder="Description"
              placeholderTextColor="#91919F"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          <View style={styles.numberInputBox}>
            <Input
              style={styles.numberInput}
              placeholder="Enter Expense"
              placeholderTextColor="#91919F"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          {imageUri ? (
            <View style={styles.imagePreview}>
              <Image source={{uri: imageUri}} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setImageUri(null)}>
                <Image source={IMAGES.CLOSE} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.attachBox}
              onPress={() => {
                setOpenModel(true);
              }}>
              <Image source={IMAGES.ATTACHMENT} />
              <Text style={styles.belowinnerContainerText}>Add attachment</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={saveData}>
            <Text style={styles.saveButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AttachmentModel
        openModel={openModel}
        setOpenModel={setOpenModel}
        onSelectImage={uri => {
          setImageUri(uri);
        }}
      />
      <SuccessfulModel
        openModel={successfullyModel}
        setOpenModel={setSuccessfulModel}
        text="Transaction has been successfully added"
      />
      <Toast />
    </>
  );
}
