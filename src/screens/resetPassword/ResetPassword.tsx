import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import Input from '../../components/input/Input';
import Toast from 'react-native-toast-message';
import {styles} from './resetPasswordStyles';
import useResetPassword from './useResetPassword';
import { COLORS } from '../../constant/color';

export default function ResetPassword() {
  const {
    goToBack,
    oldpassword,
    setOldpassword,
    newpassword,
    setNewpassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
  } = useResetPassword();

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
            placeholderTextColor={COLORS.MUTED_GREY}
            value={oldpassword}
            onChangeText={setOldpassword}
            secureTextEntry={true}
          />
          <Input
            style={styles.inputField}
            placeholder="New Password"
            placeholderTextColor={COLORS.MUTED_GREY}
            value={newpassword}
            onChangeText={setNewpassword}
            secureTextEntry={true}
          />
          <Input
            style={styles.inputField}
            placeholder="ReType New Password"
            placeholderTextColor={COLORS.MUTED_GREY}
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
