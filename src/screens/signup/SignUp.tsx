import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import Input from '../../components/input/Input';
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation();

  const goToLogin = () => {
    // Navigate to Login Screen
    navigation.navigate('Login');
  };
  const goToLandingPage = () => {
    try {
      navigation.navigate('LaunchScreen');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={style.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={style.topcontainer}>
          <TouchableOpacity onPress={goToLandingPage}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={style.topcontainerText}>Sign Up</Text>
          <Text></Text>
        </View>

        <View style={style.inputcontainer}>
          <Input
            style={style.inputField}
            placeholder="Name"
            placeholderTextColor="#91919F"
            // value={name}
            // onChangeText={setName}
          />
          <Input
            style={style.inputField}
            placeholder="Email"
            placeholderTextColor="#91919F"
            // value={email}
            // onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            style={style.inputField}
            placeholder="Password"
            placeholderTextColor="#91919F"
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry={true} // To hide the password input
          />
        </View>

        <View style={style.label}>
          <Text style={style.check}></Text>
          <Text>
            By signing up, you agree to the{' '}
            <Text style={style.labelText}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} onPress={() => {}}>
            <Text style={style.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={style.orText}>
          <Text>or</Text>
        </View>

        <View style={style.googleSign}>
          <Image source={IMAGES.GOOGLE}></Image>
          <Text style={style.googletext}>Sign Up with Google</Text>
        </View>

        <View style={style.login}>
          <Text>
            Already have an account?{' '}
            <Text style={style.labelText} onPress={goToLogin}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
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
    flex: 3,
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
  label: {
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'row',
    gap: 10,
  },
  labelText: {
    color: '#7F00FF',
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#7F00FF',
  },
  btn: {
    flex: 1,
    paddingHorizontal: 20,
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
  orText: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  googletext: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  googleSign: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  login: {
    flex: 3,
    alignItems: 'center',
    fontSize: 16,
  },
});
