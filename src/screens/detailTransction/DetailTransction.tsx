import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../constant/image';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {deleteTransaction} from '../../store/transctionSlice/transctionSlice';
import moment from 'moment';
import {styles} from './detailTransctionStyles';
import {DetailTransactionRouteProp, ParamTransaction} from '../../types/types';
import Logout from '../../components/logout/Logout';

export default function DetailTransction() {
  const [openModel, setOpenModel] = useState(false);
  const route = useRoute<DetailTransactionRouteProp>();
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const transaction: ParamTransaction = route.params?.transaction || {};
  const {selectedCurrency, exchangeRates} = useAppSelector(
    state => state.transctions,
  );
  const formattedDate = transaction.timestamp
    ? moment(transaction.timestamp).format('dddd D MMMM YYYY hh:mm A')
    : 'No Date Available';

  const goToHome = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const onYesPress = async (transactionId: string) => {
    await dispatch(deleteTransaction(transactionId));
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

  const isExpense = transaction.type === 'Expense';

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.topcontainer,
            {backgroundColor: isExpense ? '#FD3C4A' : '#00A86B'},
          ]}>
          <View style={styles.topbar}>
            <TouchableOpacity onPress={goToHome}>
              <Image source={IMAGES.WHITEARROW} />
            </TouchableOpacity>
            <Text style={styles.topcontainerText}>Detail Transction</Text>
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.TRASH} />
            </TouchableOpacity>
          </View>
          <View style={styles.redcontainer}>
            <View>
              <Text style={styles.amount}>
                {' '}
                {convertAmount(transaction.amount, selectedCurrency)}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>{transaction.description}</Text>
            </View>
            <View style={styles.datebox}>
              <Text style={styles.dateboxText}>{formattedDate}</Text>
              <Text style={styles.dateboxText}>{transaction.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.belowContainer}>
          <View style={styles.belowBox1}>
            <View>
              <Text style={styles.box1Text}>Type</Text>
              <Text style={styles.box1Text2}>
                {isExpense ? 'Expense' : 'Income'}
              </Text>
            </View>
            <View>
              <Text style={styles.box1Text}>Category</Text>
              <Text style={styles.box1Text2}>{transaction.category}</Text>
            </View>
            <View>
              <Text style={styles.box1Text}>Wallet</Text>
              <Text style={styles.box1Text2}>paypal</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionHead}>Description</Text>
            <Text style={styles.descriptionText}>
              {transaction.description}
            </Text>
          </View>
          <View style={styles.pictureBox}>
            <View>
              <Text style={styles.imageText}>Attachment</Text>
            </View>
            <TouchableOpacity
              style={styles.pic}
              onPress={() => setFullScreenImage(transaction.imageUri ?? null)}>
              {transaction.imageUri ? (
                <Image
                  style={styles.actualpic}
                  resizeMode="cover"
                  source={{uri: transaction.imageUri}}
                />
              ) : (
                <Text>No image available</Text>
              )}
            </TouchableOpacity>
            <Modal
              visible={!!fullScreenImage}
              transparent={true}
              animationType="fade">
              <View style={styles.modalBackground}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setFullScreenImage(null)}>
                  <Image source={IMAGES.CLOSE} style={styles.closeIcon} />
                </TouchableOpacity>

                <Image
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                  source={fullScreenImage ? {uri: fullScreenImage} : undefined}
                />
              </View>
            </Modal>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <Logout
            openModel={openModel}
            setOpenModel={setOpenModel}
            title="Remove this transaction?"
            description="Are you sure do you wanna remove this transaction?"
            text="Transaction has been Successfully Removed"
            YesPress={() => onYesPress(transaction.id)}
            navigateToHome={true}
          />
        </View>
      </View>
    </>
  );
}
