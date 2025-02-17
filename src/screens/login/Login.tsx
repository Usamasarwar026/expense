import {
  View,
  Text,
  Image,
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
import {GoogleSignup, login} from '../../store/authSlice/authSlice';
import {styles} from './loginStyles';
import {navigate} from '../../navigation/navigationRef';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const goToBack = () => {
    navigate('SignUp');
  };
  const goToSignup = () => {
    try {
      navigate('SignUp');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const goToForget = () => {
    try {
      navigate('Forget');
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

        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Logged in successfully',
            position: 'top',
            visibilityTime: 2000,
          });
        }, 1500);
      }
    } catch (errorMessage) {
      console.log('Login Error:', errorMessage);
      Toast.show({
        type: 'error',
        text1: errorMessage as string,
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  const dispatchGoogleSignIn = async () => {
    try {
      const resultAction = await dispatch(GoogleSignup());
      if (GoogleSignup.fulfilled.match(resultAction)) {
        Toast.show({
          type: 'success',
          text1: 'Google Sign-In Successful!',
          position: 'top',
          visibilityTime: 3000,
        });

        navigate('Home');
      } else {
        const errorMessage =
          resultAction.payload || 'Something went wrong! Please try again.';
        Toast.show({
          type: 'error',
          text1: 'Google Sign-In Failed!',
          text2: String(errorMessage) || 'Please try again.',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed!==> Please try again',
        text2: error.message || 'An unexpected error occurred.',
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

        <TouchableOpacity
          style={styles.googleSign}
          onPress={dispatchGoogleSignIn}>
          <Image source={IMAGES.GOOGLE}></Image>
          <Text style={styles.googletext}>Sign Up with Google</Text>
        </TouchableOpacity>

        <View style={styles.login}>
          <TouchableOpacity onPress={goToSignup}>
            <Text>
              Don’t have an account yet?
              <Text style={styles.labelText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </KeyboardAvoidingView>
  );
}
