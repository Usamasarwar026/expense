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
import {CommonActions, useNavigation} from '@react-navigation/native';

export default function ResetPassword() {
  const navigation = useNavigation();

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
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry={true} 
          />
          <Input
            style={style.inputField}
            placeholder="New Password"
            placeholderTextColor="#91919F"
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry={true} 
          />
          <Input
            style={style.inputField}
            placeholder="ReType New Password"
            placeholderTextColor="#91919F"
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry={true} 
          />
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} onPress={() => {}}>
            <Text style={style.buttonText}>Change Password</Text>
          </TouchableOpacity>
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
