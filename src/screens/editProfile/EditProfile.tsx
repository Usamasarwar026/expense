import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import Input from '../../components/input/Input';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {updateEmail, updateName} from '../../store/authSlice/authSlice';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function EditProfile() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const goToProfile = () => {
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

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    const result = await launchImageLibrary(options);
    if (result.assets) {
      console.log('Selected Image from Gallery:', result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    const result = await launchCamera(options);
    if (result.assets) {
      Alert.alert('Selected Image:', result.assets[0].uri);
    }
  };

  const openImagePicker = () => {
    Alert.alert(
      "Select an option",
      "Choose an image from the gallery or take a new photo.",
      [
        {
          text: "Gallery",
          onPress: openGallery,
        },
        {
          text: "Camera",
          onPress: openCamera,
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdateProfile = async () => {
    console.log('Email:', email);
    console.log('Name:', name);
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'Please fill the name field ',
        text2: 'and you can not update the email !',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    if (email) {
      Toast.show({
        type: 'error',
        text1: 'You can not update the email! ',
        text2: 'please do not fill the email to update',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      let updatedFields = [];

      if (email) {
        await dispatch(updateEmail(email));
        updatedFields.push('Email');
      }

      if (name) {
        await dispatch(updateName(name));
        updatedFields.push('Name');
      }

      if (updatedFields.length > 1) {
        setTimeout(() => {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Profile Updated!',
            text2: 'Both Email and Name have been updated.',
          });
        }, 1500);
      } else {
        if (updatedFields.includes('Email')) {
          setTimeout(() => {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Profile Updated!',
              text2: 'Email has been updated.',
            });
          }, 1500);
        }

        if (updatedFields.includes('Name')) {
          setTimeout(() => {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Profile Updated!',
              text2: 'Name has been updated.',
            });
          }, 1500);
        }
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error updating profile',
        text2: error.message,
      });
    }

    goToProfile();
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
            <TouchableOpacity
              style={style.editbtn}
              // onPress={openGallery}
              onPress={openImagePicker}>
              <Image source={IMAGES.EDIT} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.inputcontainer}>
          <View style={style.inputTextfields}>
            <Text style={style.inputText}>Email</Text>
            <Input
              style={style.inputField}
              placeholder="Email"
              placeholderTextColor="#91919F"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={style.inputTextfields}>
            <Text style={style.inputText}>Name</Text>
            <Input
              style={style.inputField}
              placeholder="name"
              placeholderTextColor="#91919F"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={style.btn}>
          <TouchableOpacity style={style.button} onPress={handleUpdateProfile}>
            <Text style={style.buttonText}>Update Profile</Text>
          </TouchableOpacity>
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
  picBox: {
    borderWidth: 2,
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 86,
  },
  pic: {
    width: 120,
    height: 120,
    borderRadius: 86,
  },
  inputTextfields: {
    gap: 10,
  },
  inputText: {
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
  editbtn: {
    width: 36,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
