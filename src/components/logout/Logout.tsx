import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SuccessfulModel from '../successfulModel/SuccessfulModel';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import {styles} from './logoutStyles';
import {LogoutModelProps} from '../../types/types';

export default function Logout({
  openModel,
  setOpenModel,
  title,
  description,
  text,
  YesPress,
  navigateToHome = false,
  navigateToLogin = false,
}: LogoutModelProps) {
  const [successModelVisible, setSuccessModelVisible] = useState(false);
  const navigation = useNavigation();

  const handleYesPress = async () => {
    setOpenModel(false);
    const user = auth().currentUser;

    if (!user) {
      console.log('No user is currently signed in');
      Toast.show({
        text1: 'Error',
        text2: 'No user is currently signed in',
        type: 'error',
        visibilityTime: 3000,
      });
      return;
    }

    if (YesPress) {
      await YesPress();

      setSuccessModelVisible(true);

      setTimeout(async () => {
        setSuccessModelVisible(false);
        if (navigateToLogin) {
          await auth().signOut();
        }
        if (navigateToHome) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'TabNavigation', params: {screen: 'Home'}}],
            }),
          );
        }
      }, 3000);
    } else {
      setOpenModel(false);
      Toast.show({
        text1: 'Error',
        text2: 'No user is currently signed in',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  return (
    <>
      <Modal visible={openModel} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setOpenModel(false)}>
          <Animated.View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <Text style={styles.logoutline}></Text>
          <Text style={styles.logout}>{title}</Text>
          <Text style={styles.modalText}>{description}</Text>
          <View style={styles.logoutbtn}>
            <TouchableOpacity
              onPress={() => {
                setOpenModel(false);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleYesPress} style={styles.button1}>
              <Text style={styles.buttonText1}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SuccessfulModel
        openModel={successModelVisible}
        setOpenModel={setSuccessModelVisible}
        text={text}
      />
      <Toast />
    </>
  );
}
