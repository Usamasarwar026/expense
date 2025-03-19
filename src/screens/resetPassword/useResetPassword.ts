import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {changePassword} from '../../store/slices/authSlice/authSlice';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

export default function useResetPassword() {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    if (!oldpassword || !newpassword || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      const email = auth().currentUser?.email;

      if (!email) {
        Toast.show({
          type: 'error',
          text1: 'User is not authenticated',
          position: 'top',
          visibilityTime: 200,
          autoHide: true,
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

      setIsLoading(false);

      if (changePassword.fulfilled.match(actionResult)) {
        goToBack();
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Password successfully updated!',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true,
          });
        }, 1500);
      }
    } catch (error) {
      const typedError = error as Error;
      setIsLoading(false);

      Toast.show({
        type: 'error',
        text1: typedError.message,
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
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
