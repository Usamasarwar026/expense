import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import CurrencyModal from '../../components/currencyModel/CurrencyModel';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { saveSelectedCurrency } from '../../store/transctionSlice/transctionSlice';
import { styles } from './settingScreenStyles';

export default function SettingScreen() {
  const Navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [Currency, setCurrency] = useState('USD');
  const selectedCurrency = useAppSelector(state => state.transctions.selectedCurrency );


useEffect(() => {
  if (selectedCurrency) {
    setCurrency(selectedCurrency); 
  }
}, [selectedCurrency]);

  const goToBack = () => {
    try {
      Navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabNavigation', params: {screen: 'Profile'}}],
        }),
      );
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const handleCurrencySelect = async(currency: string) => {
    await dispatch(saveSelectedCurrency(currency));
    setCurrency(currency); 
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToBack}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Setting</Text>
          <Text></Text>
        </View>

        <View style={styles.inputcontainer}>
          <TouchableOpacity style={styles.currencyBox}  onPress={() => setModalVisible(true)}>
            <View>
              <Text style={styles.currencyBoxText}>Currency</Text>
            </View>
            <View style={styles.rightBox}>
              <View>
                <Text>{Currency || 'USD'}</Text>
              </View>
              <View>
                <Image style={styles.img} source={IMAGES.RIGHT_ARROW} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.currencyBox}>
            <View>
              <Text style={styles.currencyBoxText}>Notification</Text>
            </View>
            <View style={styles.rightBox}>
              <View>
                <Image style={styles.img} source={IMAGES.RIGHT_ARROW} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.btn}></View>
      </ScrollView>

      <CurrencyModal visible={modalVisible} onClose={() => setModalVisible(false)} onSelectCurrency={handleCurrencySelect} />

    </KeyboardAvoidingView>
  );
}
