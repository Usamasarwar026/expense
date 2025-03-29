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
import Input from '../../components/input/Input';
import Toast from 'react-native-toast-message';
import {styles} from './forgetPasswordStyles';
import {useForgetPassword} from './useForgetPassword';

export default function ForgetPassword() {
  const {email, setEmail, goToBack, handleSendEmail} = useForgetPassword();

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
