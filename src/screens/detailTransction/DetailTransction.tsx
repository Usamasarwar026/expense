import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {deleteTransaction} from '../../store/transctionSlice/transctionSlice';
import moment from 'moment';
import {navigate} from '../../navigation/navigationRef';
import {styles} from './detailTransctionStyles';
import {DetailTransactionRouteProp, ParamTransaction} from '../../types/types';
import Logout from '../../components/logout/Logout';

export default function DetailTransction() {
  const [openModel, setOpenModel] = React.useState(false);
  const route = useRoute<DetailTransactionRouteProp>();
  const dispatch = useAppDispatch();
  const transaction: ParamTransaction = route.params?.transaction || {};
  const formattedDate = transaction.timestamp
    ? moment(transaction.timestamp).format('dddd D MMMM YYYY hh:mm A')
    : 'No Date Available';

  const goToFinancialReport = () => {
    try {
      navigate('FinancialReport');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const onYesPress = async (transactionId: string) => {
    await dispatch(deleteTransaction(transactionId));
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
            <TouchableOpacity onPress={goToFinancialReport}>
              <Image source={IMAGES.WHITEARROW} />
            </TouchableOpacity>
            <Text style={styles.topcontainerText}>Detail Transction</Text>
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.TRASH} />
            </TouchableOpacity>
          </View>
          <View style={styles.redcontainer}>
            <View>
              <Text style={styles.amount}>{transaction.amount}</Text>
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
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </Text>
          </View>
          <View style={styles.pictureBox}>
            <View>
              <Text style={styles.imageText}>Attachment</Text>
            </View>
            <View style={styles.pic}>
              {transaction.imageUri ? (
                <Image
                  style={styles.actualpic}
                  resizeMode="cover"
                  source={{uri: transaction.imageUri}}
                />
              ) : (
                <Text>No image available</Text>
              )}
            </View>
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
