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
import { useAppDispatch } from '../../hooks/useRedux';
import { changePassword } from '../../store/authSlice/authSlice';
import auth from '@react-native-firebase/auth';

export default function ResetPassword() {
  const [oldpassword, setOldpassword] = React.useState('');
  const [newpassword, setNewpassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); 
  const navigation = useNavigation();
  const dispatch = useAppDispatch(); // Use the Redux dispatch function

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
    setIsLoading(true); // Set loading state to true

    const email = auth().currentUser?.email; // Get the current user's email

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
      changePassword({email, currentPassword: oldpassword, newPassword: newpassword })
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
  } catch (error:any) {
    setIsLoading(false); // Set loading state to false in case of error

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
    <KeyboardAvoidingView style={style.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={style.topcontainer}>
          <TouchableOpacity onPress={goToBack}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={style.topcontainerText}>Reset Password</Text>
          <Text></Text>
        </View>

        <View style={style.inputcontainer}>
          <Input
            style={style.inputField}
            placeholder="Old Password"
            placeholderTextColor="#91919F"
            value={oldpassword}
            onChangeText={setOldpassword}
            secureTextEntry={true} 
          />
          <Input
            style={style.inputField}
            placeholder="New Password"
            placeholderTextColor="#91919F"
            value={newpassword}
            onChangeText={setNewpassword}
            secureTextEntry={true} 
          />
          <Input
            style={style.inputField}
            placeholder="ReType New Password"
            placeholderTextColor="#91919F"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true} 
          />
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} onPress={handleChangePassword}>
            <Text style={style.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast/>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topcontainerText: {
    fontSize: 16,
    fontWeight: '700',
  },
  inputcontainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  inputField: {
    width: 343,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
  },

  textcontainer: {
    flex: 1,
    width: 343,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // width: 343,
  },
  forgettext: {
    fontSize: 24,
    fontWeight: '600',
  },

  labelText: {
    color: '#7F00FF',
  },

  btn: {
    flex: 6,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    marginBottom: 20,
    // width: 343,
    // height: 56,
  },
  button: {
    width: 343,
    height: 56,
    backgroundColor: '#7F3DFF',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
