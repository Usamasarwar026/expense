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
import {useAppDispatch} from '../../hooks/useRedux';
import {signup} from '../../store/authSlice/authSlice';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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

  const signupfunction = async () => {
    
    try {
      const resultAction = await dispatch(signup({name, email, password}));
      console.log('resultAction:', resultAction); // Log the result of the signup action
  
      if (signup.fulfilled.match(resultAction)) {
        // Navigate only if signup is successful
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'TabNavigation', params: { screen: 'Home' } }],
          })
        );
      } else {
        console.error('Signup failed:', resultAction.payload);
        // Handle specific error from the action
      }
    } catch (error) {
      console.error('Signup Error:', error);
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
            value={name}
            onChangeText={nam => setName(nam)}
          />
          <Input
            style={style.inputField}
            placeholder="Email"
            placeholderTextColor="#91919F"
            value={email}
            onChangeText={eml => setEmail(eml)}
            keyboardType="email-address"
          />
          <Input
            style={style.inputField}
            placeholder="Password"
            placeholderTextColor="#91919F"
            value={password}
            onChangeText={pass => setPassword(pass)}
            // secureTextEntry={true} // To hide the password input
          />
        </View>

        <View style={style.label}>
          <TouchableOpacity
            style={[style.checkbox, isChecked && style.checked]}
            onPress={() => setChecked(!isChecked)}>
            {isChecked && <Text style={style.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text>
            By signing up, you agree to the{' '}
            <Text style={style.labelText}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} onPress={signupfunction}>
            <Text style={style.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={style.orText}>
          <Text>or</Text>
        </View>

        <TouchableOpacity style={style.googleSign}>
          <Image source={IMAGES.GOOGLE}></Image>
          <Text style={style.googletext}>Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.login} onPress={goToLogin}>
          <Text>
            Already have an account? <Text style={style.labelText}>Login</Text>
          </Text>
        </TouchableOpacity>
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

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#7F3DFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checked: {
    backgroundColor: '#7F3DFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
});
