import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {GoogleSignup, login} from '../../store/authSlice/authSlice';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const goToBack = () => {
    navigation.goBack();
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
      console.error('Login Error:', errorMessage);
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

  return {
    goToBack,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    goToForget,
    dispatchGoogleSignIn,
    goToSignup,
  };
}
