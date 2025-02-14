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
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {GoogleSignup, signup} from '../../store/authSlice/authSlice';
import Toast from 'react-native-toast-message';
import {styles} from './signUpStyles';
import {navigate} from '../../navigation/navigationRef';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const goToLogin = () => {
    // Navigate to Login Screen
    navigate('Login');
  };
  const goToLandingPage = () => {
    try {
      navigate('LaunchScreen');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const signupfunction = async () => {
    try {
      if (!name || !email || !password) {
        Toast.show({
          type: 'error',
          text1: 'Please fill all fields.',
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }
      if (!isChecked) {
        Toast.show({
          type: 'error',
          text1: 'Please Accept the Terms and Privacy Policy.',
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }
      if (password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Password must be at least 6 characters long.',
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }

      const resultAction = await dispatch(signup({name, email, password}));
      if (signup.fulfilled.match(resultAction)) {
        navigate('Login');

        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Signup Successful!',
            text2: 'You can now log in to your account.',
            position: 'top',
            visibilityTime: 3000,
          });
        }, 1500);

        setName('');
        setEmail('');
        setPassword('');
      } else {
        // 🔹 Handle signup rejection error properly
        const errorMessage =
          resultAction.payload || 'Signup failed, please try again.';
        console.log('Signup Error:', errorMessage);
        Toast.show({
          type: 'error',
          text1: errorMessage,
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup failed, please try again.',
        position: 'top',
        visibilityTime: 3000,
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

        navigate('Home'); // Navigate to home screen after login
      } else {
        const errorMessage =
          resultAction.payload || 'Something went wrong! Please try again.';
        Toast.show({
          type: 'error',
          text1: 'Google Sign-In Failed!',
          text2: errorMessage || 'Please try again.',
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
          <TouchableOpacity onPress={goToLandingPage}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Sign Up</Text>
          <Text></Text>
        </View>

        <View style={styles.inputcontainer}>
          <Input
            style={styles.inputField}
            placeholder="Name"
            placeholderTextColor="#91919F"
            value={name}
            onChangeText={setName}
          />
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
            // secureTextEntry={true} // To hide the password input
          />
        </View>

        <View style={styles.label}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checked]}
            onPress={() => setChecked(!isChecked)}>
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text>
            By signing up, you agree to the{' '}
            <Text style={styles.labelText}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={signupfunction}>
            <Text style={styles.buttonText}>Sign Up</Text>
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

        <TouchableOpacity style={styles.login} onPress={goToLogin}>
          <Text>
            Already have an account? <Text style={styles.labelText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast />
    </KeyboardAvoidingView>
  );
}
