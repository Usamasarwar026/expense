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
import {styles} from './signUpStyles';
import useSignUp from './useSignUp';
import { COLORS } from '../../constant/color';

export default function SignUp() {
  const {
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
  } = useSignUp();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToLandingPage}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Sign Up</Text>
          <Text></Text>
        </View>

        <View style={styles.inputcontainer}>
          <Input
            style={styles.inputField}
            placeholder="Name"
            placeholderTextColor={COLORS.MUTED_GREY}
            value={name}
            onChangeText={setName}
          />
          <Input
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor={COLORS.MUTED_GREY}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            style={styles.inputField}
            placeholder="Password"
            placeholderTextColor={COLORS.MUTED_GREY}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.label}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checked]}
            onPress={() => setChecked(!isChecked)}>
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <View>
            <Text>
              By signing up, you agree to the{' '}
              <Text style={styles.labelText}>
                Terms of Service and Privacy Policy
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={signupfunction}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.btntext}>
              Already have an account?
              <Text style={styles.labelText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </KeyboardAvoidingView>
  );
}
