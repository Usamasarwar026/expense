import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import {useNavigation, useRoute} from '@react-navigation/native';
import Logout from '../logout/Logout';
import { useAppDispatch } from '../../hooks/useRedux';
import { deleteTransaction } from '../../store/transctionSlice/transctionSlice';
import moment from 'moment';

export default function DetailTransction() {
  const [openModel, setOpenModel] = React.useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const transaction = route.params?.transaction || {};

  console.log('Route Params:', route.params);
console.log('Transaction Object:', transaction);

const formattedDate = transaction.timestamp
  ? moment(transaction.timestamp).format('dddd D MMMM YYYY hh:mm A')
  : 'No Date Available';
    console.log('Transaction Time:', transaction.time);


  const goToFinancialReport = () => {
    try {
      navigation.navigate('FinancialReport');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const onYesPress = async(transactionId: string) => {

    console.log('Success model displayed====>',transactionId);
    await dispatch(deleteTransaction(transactionId))
  };
  
  

  const isExpense = transaction.type === 'Expense';

  return (
    <>
      <View style={style.container}>
        <View
          style={[
            style.topcontainer,
            {backgroundColor: isExpense ? '#FD3C4A' : '#00A86B'},
          ]}>
          <View style={style.topbar}>
            <TouchableOpacity onPress={goToFinancialReport}>
              <Image source={IMAGES.WHITEARROW} />
            </TouchableOpacity>
            <Text style={style.topcontainerText}>Detail Transction</Text>
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.TRASH} />
            </TouchableOpacity>
          </View>
          <View style={style.redcontainer}>
            <View>
              <Text style={style.amount}>{transaction.amount}</Text>
            </View>
            <View>
              <Text style={style.text}>{transaction.description}</Text>
            </View>
            <View style={style.datebox}>
              <Text style={style.dateboxText}>{formattedDate}</Text>
              <Text style={style.dateboxText}>{transaction.time}</Text>
            </View>
          </View>
        </View>

        <View style={style.belowContainer}>
          <View style={style.belowBox1}>
            <View>
              <Text style={style.box1Text}>Type</Text>
              <Text style={style.box1Text2}>
                {isExpense ? 'Expense' : 'Income'}
              </Text>
            </View>
            <View>
              <Text style={style.box1Text}>Category</Text>
              <Text style={style.box1Text2}>{transaction.category}</Text>
            </View>
            <View>
              <Text style={style.box1Text}>Wallet</Text>
              <Text style={style.box1Text2}>paypal</Text>
            </View>
          </View>
          <View style={style.description}>
            <Text style={style.descriptionHead}>Description</Text>
            <Text style={style.descriptionText}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </Text>
          </View>
          <View style={style.pictureBox}>
            <View>
              <Text style={style.imageText}>Attachment</Text>
            </View>
            <View style={style.pic}>
              {transaction.imageUri ? (
                <Image
                  style={style.actualpic}
                  resizeMode="cover"
                  source={{uri: transaction.imageUri}} // ✅ Corrected
                />
              ) : (
                <Text>No image available</Text> // Optional: Show text if image is missing
              )}
            </View>
          </View>
          <TouchableOpacity style={style.button}>
            <Text style={style.btnText}>Edit</Text>
          </TouchableOpacity>
          <Logout
            openModel={openModel}
            setOpenModel={setOpenModel}
            title="Remove this transaction?"
            description="Are you sure do you wanna remove this transaction?"
            text="Transaction has been Successfully Removed"
            YesPress={()=>onYesPress(transaction.id)}
            navigateToHome={true}
          />
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FD3C4A',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
  },
  topcontainerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  topbar: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  redcontainer: {
    flex: 3,
    alignItems: 'center',
  },
  amount: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    padding: 5,
    color: 'white',
  },
  datebox: {
    flexDirection: 'row',
    gap: 20,
    padding: 5,
  },
  dateboxText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
  },

  belowContainer: {
    flex: 2,
    backgroundColor: 'white',
    height: 150,
    marginTop: -50,
    alignItems: 'center',
    // width: 150,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  belowBox1: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    // borderBottomWidth: 1,
    borderColor: '#E6E6E6',
  },
  box1Text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',
  },
  box1Text2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D0E0F',
    paddingTop: 5,
  },
  description: {
    padding: 15,
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',
    textAlign: 'justify',
    lineHeight: 20,
    // marginBottom: 20,
  },
  descriptionHead: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91919F',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0D0E0F',
    lineHeight: 20,
  },
  pictureBox: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  pic: {
    width: '100%',
    height: 116,
    marginBottom: 10,
    borderRadius: 8,
    // overflow: 'hidden',
  },
  imageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#91919F',
    marginBottom: 10,
  },
  actualpic: {
    width: '100%',
    height: 116,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: '100%',

    borderRadius: 16,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#7F3DFF',
    marginBottom: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    padding: 5,
  },
});
