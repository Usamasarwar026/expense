import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../../components/input/Input';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {fetchUserData, storeImageUriInFirestore, updateEmail, updateName} from '../../store/authSlice/authSlice';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function EditProfile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialName, setInitialName] = useState('');
  const [initialImageUri, setInitialImageUri] = useState(null);
  const dispatch = useAppDispatch();// Replace with actual user ID (e.g., from authentication)
  
  useEffect(() => {
    
    const fetchImage = async () => {
      try {
        const { profileImageUri, name, email } = await dispatch(fetchUserData()).unwrap();
        setImageUri(profileImageUri);
        setEmail(email);
        setName(name);
        setInitialName(name);
        setInitialImageUri(profileImageUri);
        
      } catch (error) {
        console.error('Error fetching image URI:', error);
      }
      setLoading(false);
    };

    fetchImage();
  }, []);
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

  const storeImage= async (uri) => {

    try {
      await dispatch(storeImageUriInFirestore(uri))
      console.log('Image URI stored successfully');
    } catch (error) {
      console.error('Error storing image URI:', error);
    }
  };

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    const result = await launchImageLibrary(options);
    if (result.assets) {
      const selectedImageUri = result.assets[0].uri; // Local URI
    console.log('Selected Image URI from Gallery:', selectedImageUri);
    setImageUri(selectedImageUri)
    
    // Store the URI in Firestore
    await storeImage(selectedImageUri);
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
      const selectedImageUri = result.assets[0].uri; // Local URI
    // Alert.alert('Selected Image URI:', selectedImageUri);
    setImageUri(selectedImageUri);
    
    // Store the URI in Firestore
    await storeImage(selectedImageUri);
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
    try {
      // let profileUpdated = false;
      let nameUpdated = false;
      let imageUpdated = false;
  
      if (name !== initialName) {
        await dispatch(updateName(name));
        nameUpdated = true;
      }
  
      if (imageUri !== initialImageUri) {
        await storeImage(imageUri);
        imageUpdated = true;
      }
  
      // Show toast messages based on what was updated
      if (nameUpdated || imageUpdated) {
        setTimeout(() => {
          if (nameUpdated && imageUpdated) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Profile Updated!',
              text2: 'Your name and profile picture were updated successfully.',
            });
          } else if (nameUpdated) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Name Updated!',
              text2: 'Your name was updated successfully.',
            });
          } else if (imageUpdated) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Profile Picture Updated!',
              text2: 'Your profile picture was updated successfully.',
            });
          }
        }, 500); // 500ms delay
  
        
          goToProfile(); // Navigate after the toast appears
         // Delay navigation to ensure toast is visible
      }
      
    } catch (error: any) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error updating profile',
        text2: error.message,
      });
    }
  };

  const isButtonEnabled = name !== initialName || imageUri !== initialImageUri;

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
           {loading ? (
            <ActivityIndicator size='large' color="#7F3DFF" />
           ) : (
            <Image style={style.pic} source={imageUri ? { uri: imageUri } : IMAGES.MAINPROFILE} />
           ) }
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
            <Text style={style.inputText}>Email (cannot be changed)</Text>
            <Input
              style={style.inputField}
              placeholder="Email"
              placeholderTextColor="#91919F"
              value={email}
              // onChangeText={setEmail}
              editable={false}
              // keyboardType="email-address"
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
          <TouchableOpacity style={[style.button, { backgroundColor: isButtonEnabled ? '#7F3DFF' : '#8580bc' }]}  disabled={!isButtonEnabled} onPress={handleUpdateProfile}>
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
    borderColor: '#e03dff',

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
