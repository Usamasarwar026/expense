import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import {IMAGES} from '../../constant/image';
import Input from '../../components/input/Input';
import {useNavigation} from '@react-navigation/native';
import { useAppDispatch } from '../../hooks/useRedux';
import { resetPassword } from '../../store/authSlice/authSlice';
import Toast from 'react-native-toast-message';

export default function Forget() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch(); // Use the Redux dispatch function

  const goToBack = () => {
    navigation.navigate('Login');
  };

  const handleSendEmail = () => {
    if (email) {
      
      dispatch(resetPassword(email))
        .unwrap() 
       .then(()=>{
        setEmail('');
       })
       .catch((error) => {
        console.error('Failed to send email:', error);
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Failed to send the reset email. Please try again.',
          position: 'top',
          visibilityTime: 3000,
        });
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter your email address',
        position: 'top',
        visibilityTime: 3000,
      });
      
      
    }
  }
  

  return (
    <KeyboardAvoidingView style={style.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={style.topcontainer}>
          <TouchableOpacity onPress={goToBack}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={style.topcontainerText}>Forget Password</Text>
          <Text></Text>
        </View>
        <View style={style.textcontainer}>
          <Text style={style.forgettext}>
            Don’t worry. {'\n'}
            Enter your email and we’ll send you a link to reset your password.
          </Text>
        </View>

        <View style={style.inputcontainer}>
          <Input
            style={style.inputField}
            placeholder="Email"
            placeholderTextColor="#91919F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} onPress={handleSendEmail}>
            <Text style={style.buttonText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast/>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
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
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  inputField: {
    width: 343,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
  },

  textcontainer: {
    flex: 1,
    width: 343,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // width: 343,
  },
  forgettext: {
    fontSize: 24,
    fontWeight: '600',
  },

  labelText: {
    color: '#7F00FF',
  },

  btn: {
    flex: 6,
    paddingHorizontal: 20,
    // width: 343,
    // height: 56,
  },
  button: {
    width: 343,
    height: 56,
    backgroundColor: '#7F3DFF',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
