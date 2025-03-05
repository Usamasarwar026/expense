import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../../components/input/Input';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {
  fetchUserData,
  storeImageUriInFirestore,
  updateName,
} from '../../store/authSlice/authSlice';
import Toast from 'react-native-toast-message';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {styles} from './editProfileStyles';

export default function EditProfile() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialName, setInitialName] = useState<string>('');
  const [initialImageUri, setInitialImageUri] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const userData = await dispatch(fetchUserData()).unwrap();
        setImageUri(userData?.profileImageUri);
        setEmail(userData?.email);
        setName(userData?.name);
        setInitialName(userData?.name);
        setInitialImageUri(userData?.profileImageUri);
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

  const storeImage = async (uri: string): Promise<void> => {
    try {
      await dispatch(storeImageUriInFirestore(uri));
    } catch (error) {
      console.error('Error storing image URI:', error);
    }
  };

  const openGallery = async (): Promise<void> => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    const result = await launchImageLibrary(options);
    if (result.assets) {
      const selectedImageUri = result.assets?.[0]?.uri ?? null;
      if (selectedImageUri) {
        setImageUri(selectedImageUri);
      }
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
      const selectedImageUri = result.assets?.[0]?.uri ?? null;
      if (selectedImageUri) {
        setImageUri(selectedImageUri);
      }
    }
  };

  const openImagePicker = () => {
    Alert.alert(
      'Select an option',
      'Choose an image from the Gallery or take a new photo.',
      [
        {
          text: 'Gallery',
          onPress: openGallery,
        },
        {
          text: 'Camera',
          onPress: openCamera,
        },
      ],
      {cancelable: true},
    );
  };

  const handleUpdateProfile = async () => {
    try {
      let nameUpdated = false;
      let imageUpdated = false;

      if (name !== initialName) {
        await dispatch(updateName(name));
        nameUpdated = true;
      }

      if (imageUri && imageUri !== initialImageUri) {
        await storeImage(imageUri);
        imageUpdated = true;
      }

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
        }, 500);

        goToProfile();
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
              <ActivityIndicator size="large" color="#7F3DFF" />
            ) : (
              <Image
                style={styles.pic}
                source={imageUri ? {uri: imageUri} : IMAGES.MAINPROFILE}
              />
            )}
            <TouchableOpacity style={styles.editbtn} onPress={openImagePicker}>
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
              editable={false}
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
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isButtonEnabled ? '#7F3DFF' : '#8580bc'},
            ]}
            disabled={!isButtonEnabled}
            onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
