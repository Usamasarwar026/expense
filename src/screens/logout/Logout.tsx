import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import SuccessfulModel from '../../components/successfulModel/SuccessfulModel';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../hooks/useRedux';
import { logout } from '../../store/authSlice/authSlice';
import Toast from 'react-native-toast-message';
import { getAuth, signOut } from '@react-native-firebase/auth';

export default function Logout({openModel, setOpenModel,title,description, text}: any) {
  const [successModelVisible, setSuccessModelVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  const handleYesPress = async () => {
    setOpenModel(false);
    const auth = getAuth();
  
    // Check if there is a current user before attempting to sign out
    if (auth.currentUser) {
      try {
  
        await dispatch(logout()); // Dispatch the redux logout action
        setSuccessModelVisible(true); // Open the success model if logout is successful
  
        setTimeout(() => {
          setSuccessModelVisible(false); // Close success model after 3 seconds
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }, 3000);
  
      } catch (error) {
        Alert.alert('Error', 'Failed to logout');
        Toast.show({
          text1: 'Error',
          text2: 'Failed to logout',
          type: 'error',
          visibilityTime: 3000,
        });
      }
    } else {
      // If no user is signed in, show a modal or message
      setOpenModel(true); // This can be a custom modal or alert indicating no user is logged in
      console.log('No user is currently signed in');
      Toast.show({
        text1: 'Error',
        text2: 'No user is currently signed in',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  
  
  
  }
  return (
    <>
      <Modal visible={openModel} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setOpenModel(false)}>
          <Animated.View style={[style.overlay]} />
        </TouchableWithoutFeedback>
        <View style={style.modalView}>
          <Text style={style.logoutline}></Text>
          <Text style={style.logout}>{title}</Text>
          <Text style={style.modalText}>{description}</Text>
          <View style={style.logoutbtn}>
            <TouchableOpacity
              onPress={() => {
                setOpenModel(false);
              }}
              style={style.button}>
              <Text style={style.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleYesPress}
              style={style.button1}>
              <Text style={style.buttonText1}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SuccessfulModel openModel={successModelVisible} setOpenModel={setSuccessModelVisible} text={text}/>
      <Toast/>
    </>
  );
}

const style = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will make the background cover the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%', // Adjust height as needed
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Adds shadow effect
  },
  logoutline: {
    borderTopColor: '#D3BDFF',
    borderTopWidth: 3,
    width: '10%',
    height: 2,
    marginBottom: 15,
  },
  logout: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#91919F',
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingBottom: 18,
    paddingTop: 18,
    backgroundColor: '#EEE5FF',
    marginBottom: 10,
  },
  button1: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingBottom: 18,
    paddingTop: 18,
    backgroundColor: '#7F3DFF',
    marginBottom: 10,
  },
  buttonText: {
    color: '#7F3DFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
