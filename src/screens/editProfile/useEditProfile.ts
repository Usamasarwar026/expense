import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
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

export const useEditProfile = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialName, setInitialName] = useState<string>('');
  const [initialImageUri, setInitialImageUri] = useState<string | null>(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {usersData} = useAppSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserData()).unwrap();
        setImageUri(usersData?.profileImageUri ?? null);
        setEmail(usersData?.email ?? '');
        setName(usersData?.name ?? '');
        setInitialName(usersData?.name ?? '');
        setInitialImageUri(usersData?.profileImageUri ?? null);
      } catch (error) {
        console.error('Error fetching UserData:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

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
    const options: ImageLibraryOptions = {mediaType: 'photo', quality: 1};
    const result = await launchImageLibrary(options);
    if (result.assets) {
      const selectedImageUri = result.assets?.[0]?.uri ?? null;
      if (selectedImageUri) setImageUri(selectedImageUri);
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
      if (selectedImageUri) setImageUri(selectedImageUri);
    }
  };

  const openImagePicker = () => {
    Alert.alert(
      'Select an option',
      'Choose an image from the Gallery or take a new photo.',
      [
        {text: 'Gallery', onPress: openGallery},
        {text: 'Camera', onPress: openCamera},
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
          Toast.show({
            type: 'success',
            position: 'top',
            text1:
              nameUpdated && imageUpdated
                ? 'Profile Updated!'
                : nameUpdated
                ? 'Name Updated!'
                : 'Profile Picture Updated!',
            text2:
              nameUpdated && imageUpdated
                ? 'Your name and profile picture were updated successfully.'
                : nameUpdated
                ? 'Your name was updated successfully.'
                : 'Your profile picture was updated successfully.',
          });
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

  return {
    email,
    name,
    imageUri,
    loading,
    setName,
    openImagePicker,
    handleUpdateProfile,
    goToProfile,
    isButtonEnabled,
  };
};
