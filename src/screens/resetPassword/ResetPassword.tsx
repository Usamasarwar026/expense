import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import Input from '../../components/input/Input';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../hooks/useRedux';
import {changePassword} from '../../store/authSlice/authSlice';
import auth from '@react-native-firebase/auth';
import {styles} from './resetPasswordStyles';

export default function ResetPassword() {
  const [oldpassword, setOldpassword] = React.useState('');
  const [newpassword, setNewpassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const goToBack = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabNavigation', params: {screen: 'Profile'}}],
        }),
      );
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
    } catch (error: any) {
      setIsLoading(false);

      Toast.show({
        type: 'error',
        text1: error.message,
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
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
          <Text style={styles.topcontainerText}>Reset Password</Text>
          <Text></Text>
        </View>

        <View style={styles.inputcontainer}>
          <Input
            style={styles.inputField}
            placeholder="Old Password"
            placeholderTextColor="#91919F"
            value={oldpassword}
            onChangeText={setOldpassword}
            secureTextEntry={true}
          />
          <Input
            style={styles.inputField}
            placeholder="New Password"
            placeholderTextColor="#91919F"
            value={newpassword}
            onChangeText={setNewpassword}
            secureTextEntry={true}
          />
          <Input
            style={styles.inputField}
            placeholder="ReType New Password"
            placeholderTextColor="#91919F"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
