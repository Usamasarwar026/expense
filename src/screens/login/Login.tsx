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
import {CommonActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {login} from '../../store/authSlice/authSlice';
import {styles} from './loginStyles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const goToBack = () => {
    navigation.navigate('SignUp');
  };
  const goToSignup = () => {
    try {
      navigation.navigate('SignUp');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const goToForget = () => {
    try {
      navigation.navigate('Forget');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }

    try {
      await dispatch(login({email, password})).unwrap();

      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'TabNavigation', params: {screen: 'Home'}}],
          }),
        );
        setEmail('');
        setPassword('');
      }
    } catch (errorMessage) {
      console.log('Login Error:', errorMessage);
      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'top',
        visibilityTime: 2000,
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
          <Text style={styles.topcontainerText}>Login</Text>
          <Text></Text>
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
          <Input
            style={styles.inputField}
            placeholder="Password"
            placeholderTextColor="#91919F"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <TouchableOpacity onPress={goToForget}>
            <Text style={styles.forgettext}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orText}>
          <Text>or</Text>
        </View>

        <View style={styles.googleSign}>
          <Image source={IMAGES.GOOGLE}></Image>
          <Text style={styles.googletext}>Sign Up with Google</Text>
        </View>

        <View style={styles.login}>
          <Text>
            Don’t have an account yet?
            <Text style={styles.labelText} onPress={goToSignup}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>

      <Toast />
    </KeyboardAvoidingView>
  );
}
