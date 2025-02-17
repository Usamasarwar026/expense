import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';

export default function SettingScreen() {
  const Navigation = useNavigation();
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
          <TouchableOpacity style={styles.currencyBox}>
            <View>
              <Text style={styles.currencyBoxText}>Currency</Text>
            </View>
            <View style={styles.rightBox}>
              <View>
                <Text>USD</Text>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  },
  inputcontainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  btn: {
    flex: 6,
  },
  currencyBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  currencyBoxText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
