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
import {CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { styles } from './editProfileStyles';

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
        const { profileImageUri, name, email }:any = await dispatch(fetchUserData()).unwrap();
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

  const openGallery = async (): Promise<void> => {
    const options:ImageLibraryOptions = {
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

  const openCamera = async (): Promise<void> => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    const result = await launchCamera(options);
    if (result.assets) {
      const selectedImageUri = result.assets[0].uri; 
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
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToProfile}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Update Profile</Text>
          <Text></Text>
        </View>
        <View style={styles.picConatiner}>
          <View style={styles.picBox}>
           {loading ? (
            <ActivityIndicator size='large' color="#7F3DFF" />
           ) : (
            <Image style={styles.pic} source={imageUri ? { uri: imageUri } : IMAGES.MAINPROFILE} />
           ) }
            <TouchableOpacity
              style={styles.editbtn}
              // onPress={openGallery}
              onPress={openImagePicker}>
              <Image source={IMAGES.EDIT} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputcontainer}>
          <View style={styles.inputTextfields}>
            <Text style={styles.inputText}>Email (cannot be changed)</Text>
            <Input
              style={styles.inputField}
              placeholder="Email"
              placeholderTextColor="#91919F"
              value={email}
              // onChangeText={setEmail}
              editable={false}
              // keyboardType="email-address"
            />
          </View>
          <View style={styles.inputTextfields}>
            <Text style={styles.inputText}>Name</Text>
            <Input
              style={styles.inputField}
              placeholder="name"
              placeholderTextColor="#91919F"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity style={[styles.button, { backgroundColor: isButtonEnabled ? '#7F3DFF' : '#8580bc' }]}  disabled={!isButtonEnabled} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
