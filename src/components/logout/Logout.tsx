import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SuccessfulModel from '../successfulModel/SuccessfulModel';
import Toast from 'react-native-toast-message';
import {styles} from './logoutStyles';
import {LogoutModelProps} from '../../types/types';
import {useLogout} from './useLogout';

export default function Logout({
  openModel,
  setOpenModel,
  title,
  description,
  text,
  YesPress,
  navigateToHome = false,
}: LogoutModelProps) {
  const {successModelVisible, setSuccessModelVisible, handleYesPress} =
    useLogout({
      setOpenModel,
      YesPress,
      navigateToHome,
    });
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
