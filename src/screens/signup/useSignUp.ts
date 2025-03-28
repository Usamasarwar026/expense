import {useAppDispatch} from '../../hooks/useRedux';
import {GoogleSignup, signup} from '../../store/slices/authSlice/authSlice';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

export default function useSignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  const goToLogin = () => {
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
        const errorMessage =
          resultAction.payload || 'Signup failed, please try again.';
        Toast.show({
          type: 'error',
          text1: errorMessage as string,
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
    } catch (error) {
      const typedError = error as Error;
      console.error('Google Sign-In Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed! Please try again',
        text2: typedError.message || 'An unexpected error occurred.',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };
  return {
    goToLandingPage,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isChecked,
    setChecked,
    signupfunction,
    dispatchGoogleSignIn,
    goToLogin,
  };
}
