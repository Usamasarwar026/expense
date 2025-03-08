import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import CurrencyModal from '../../components/currencyModel/CurrencyModel';
import {styles} from './settingScreenStyles';
import useSettingScreen from './useSettingScreen';

export default function SettingScreen() {
  
const {
  goToBack,
    modalVisible,
    setModalVisible,
    selectedCurrency,
    handleCurrencySelect,
} = useSettingScreen();
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
          <TouchableOpacity
            style={styles.currencyBox}
            onPress={() => setModalVisible(true)}>
            <View>
              <Text style={styles.currencyBoxText}>Currency</Text>
            </View>
            <View style={styles.rightBox}>
              <View>
                <Text>{selectedCurrency}</Text>
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

      <CurrencyModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectCurrency={handleCurrencySelect}
      />
    </KeyboardAvoidingView>
  );
}
