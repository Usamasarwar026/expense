import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {GoogleSignup, login} from '../../store/slices/authSlice/authSlice';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {useState} from 'react';
import {showToast} from '../../utils/toastUtils';

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
      showToast({
        type: 'error',
        message: 'Please fill in all fields',
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
          showToast({
            message: 'Logged in Successfully',
          });
        }, 1500);
      }
    } catch (errorMessage) {
      console.error('Login Error:', errorMessage);
      showToast({
        type: 'error',
        message: errorMessage as string,
      });
    }
  };

  const dispatchGoogleSignIn = async () => {
    try {
      const resultAction = await dispatch(GoogleSignup());
      if (GoogleSignup.fulfilled.match(resultAction)) {
        showToast({
          message: 'Google Sign-In Successfull',
        });
        navigate('Home');
      } else {
        const errorMessage =
          resultAction.payload || 'Something went wrong! Please try again.';
        showToast({
          type: 'error',
          message: 'Google Sign-In Failed!',
          description: (errorMessage as string) || 'please try again',
        });
      }
    } catch (error) {
      const typedError = error as Error;
      console.error('Google Sign-In Error:', error);
      showToast({
        type: 'error',
        message: 'Google Sign-In Failed! Please try again',
        description: typedError.message || 'An unexpected error occurred.',
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
