import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../constant/image';
import Input from '../../components/input/Input';
import {useAppDispatch} from '../../hooks/useRedux';
import {resetPassword} from '../../store/authSlice/authSlice';
import Toast from 'react-native-toast-message';
import {styles} from './forgetStyles';
import {navigate} from '../../navigation/navigationRef';

export default function Forget() {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const goToBack = () => {
    navigate('Login');
  };

  const handleSendEmail = () => {
    if (email) {
      dispatch(resetPassword(email))
        .unwrap()
        .then(() => {
          setEmail('');
        })
        .catch(error => {
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
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToBack}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Forget Password</Text>
          <Text></Text>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.forgettext}>
            Don’t worry. {'\n'}
            Enter your email and we’ll send you a link to reset your password.
          </Text>
        </View>

        <View style={styles.inputcontainer}>
          <Input
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor="#91919F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
