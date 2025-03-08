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
import {styles} from './loginStyles';
import useLogin from './useLogin';

export default function Login() {
  const {
    goToBack,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    goToForget,
    dispatchGoogleSignIn,
    goToSignup,
  } = useLogin();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToBack}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Login</Text>
          <Text></Text>
        </View>

        <View style={styles.inputcontainer}>
          <Input
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor="#91919F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            style={styles.inputField}
            placeholder="Password"
            placeholderTextColor="#91919F"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <TouchableOpacity onPress={goToForget}>
            <Text style={styles.forgettext}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orText}>
          <Text>or</Text>
        </View>

        <TouchableOpacity
          style={styles.googleSign}
          onPress={dispatchGoogleSignIn}>
          <Image source={IMAGES.GOOGLE}></Image>
          <Text style={styles.googletext}>Sign Up with Google</Text>
        </TouchableOpacity>

        <View style={styles.login}>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.btntext}>
              Don’t have an account yet?
              <Text style={styles.labelText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </KeyboardAvoidingView>
  );
}
