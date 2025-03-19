import {useState} from 'react';
import {useAppDispatch} from '../../hooks/useRedux';
import {resetPassword} from '../../store/slices/authSlice/authSlice';
import Toast from 'react-native-toast-message';
import {navigate} from '../../navigation/navigationRef/navigationRef';

export const useForgetPassword = () => {
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

  return {email, setEmail, goToBack, handleSendEmail};
};
