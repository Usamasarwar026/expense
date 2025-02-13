import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../constant/image';
import Input from '../../components/input/Input';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {login} from '../../store/authSlice/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const goToBack = () => {
    navigation.navigate('SignUp');
  };
  const goToSignup = () => {
    try {
      navigation.navigate('SignUp');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  const goToForget = () => {
    try {
      navigation.navigate('Forget');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }
  
    try {
      await dispatch(login({email, password})).unwrap();
      
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'TabNavigation', params: {screen: 'Home'}}],
          }),
        );
        setEmail('');
        setPassword('');
      }
    } catch (errorMessage) {
      console.log('Login Error:', errorMessage);
      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };
  

  return (
    <KeyboardAvoidingView style={style.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >
        <View style={style.topcontainer}>
          <TouchableOpacity onPress={goToBack}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={style.topcontainerText}>Login</Text>
          <Text></Text>
        </View>

        <View style={style.inputcontainer}>
          <Input
            style={style.inputField}
            placeholder="Email"
            placeholderTextColor="#91919F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            style={style.inputField}
            placeholder="Password"
            placeholderTextColor="#91919F"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} onPress={handleLogin}>
            <Text style={style.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={style.label}>
          <TouchableOpacity onPress={goToForget}>
            <Text style={style.forgettext}>Forget Password?</Text>
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
            Don’t have an account yet?
            <Text style={style.labelText} onPress={goToSignup}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>

      <Toast />
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
  label: {
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  forgettext: {
    color: '#7F00FF',
  },
  labelText: {
    color: '#7F00FF',
  },

  btn: {
    flex: 1,
    paddingHorizontal: 20,
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
    flex: 6,
    alignItems: 'center',
    fontSize: 16,
  },
});
