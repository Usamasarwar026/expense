import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Input from '../../components/input/Input';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';

export default function EditProfile() {
  const navigation = useNavigation();
  const goToProfile = () => {
    try {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'TabNavigation', params: { screen: 'Profile' } }],
            })
        );
      } catch (error) {
        console.error('Navigation Error:', error);
      }
  };
  return (
    <KeyboardAvoidingView style={style.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={style.topcontainer}>
          <TouchableOpacity onPress={goToProfile}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={style.topcontainerText}>Update Profile</Text>
          <Text></Text>
        </View>
        <View style={style.picConatiner}>
          <View style={style.picBox}>
            <Image style={style.pic} source={IMAGES.MAINPROFILE} />
          </View>
        </View>

        <View style={style.inputcontainer}>
          <View style={style.inputTextfields}>
            <Text  style={style.inputText}>Email</Text>
            <Input
              style={style.inputField}
              placeholder="Email"
              placeholderTextColor="#91919F"
              // value={email}
              // onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={style.inputTextfields}>
            <Text style={style.inputText}>Name</Text>
            <Input
              style={style.inputField}
              placeholder="name"
              placeholderTextColor="#91919F"
              // value={password}
              // onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} >
            <Text style={style.buttonText}>Update Profile</Text>
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
    flex: 1,
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
  picConatiner: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picBox:{
    borderWidth: 2,
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    
    borderRadius: 86,
    
  },
  pic:{
    width: 120,
    height: 120,
    borderRadius: 86,

  },
  inputTextfields:{
    gap: 10,
  },
  inputText:{
    fontSize: 18,
    fontWeight: '600',
  },

  btn: {
    flex: 4,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    marginBottom: 10,
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
