import {useState} from 'react';
import {useAppDispatch} from '../../hooks/useRedux';
import {resetPassword} from '../../store/slices/authSlice/authSlice';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {showToast} from '../../utils/toastUtils';

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
          showToast({
            type: 'error',
            message: 'Error!',
            description: 'Failed to send the reset email. Please try again.',
          });
        });
    } else {
      showToast({
        type: 'error',
        message: 'Please enter your email address to proceed',
      });
    }
  };

  return {email, setEmail, goToBack, handleSendEmail};
};
