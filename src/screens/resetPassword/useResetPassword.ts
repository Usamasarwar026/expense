import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {changePassword} from '../../store/slices/authSlice/authSlice';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {showToast} from '../../utils/toastUtils';

export default function useResetPassword() {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const goToBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const handleChangePassword = async () => {
    if (newpassword !== confirmPassword) {
      showToast({
        type: 'error',
        message: 'Passwords do not match',
      });
      return;
    }

    if (!oldpassword || !newpassword || !confirmPassword) {
      showToast({
        type: 'error',
        message: 'All fields are required',
      });
      return;
    }

    try {
      const email = auth().currentUser?.email;

      if (!email) {
        showToast({
          type: 'error',
          message: 'User is not authenticated',
        });
        return;
      }

      const actionResult = await dispatch(
        changePassword({
          email,
          currentPassword: oldpassword,
          newPassword: newpassword,
        }),
      );

      if (changePassword.fulfilled.match(actionResult)) {
        goToBack();
        setTimeout(() => {
          showToast({
            message: 'Password successfully updated!',
          });
        }, 1500);
      }
    } catch (error) {
      const typedError = error as Error;
      showToast({
        type: 'error',
        message: 'Error updating password',
        description: typedError.message,
      });
    }
  };

  return {
    goToBack,
    oldpassword,
    setOldpassword,
    newpassword,
    setNewpassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
  };
}
