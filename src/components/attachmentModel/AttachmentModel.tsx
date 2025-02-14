import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {AttachmentProp} from '../../types/types';
import {style} from './attachmentModelStyle';

export default function AttachmentModel({
  openModel,
  setOpenModel,
  onSelectImage,
}: AttachmentProp) {
  const openCamera = async (): Promise<void> => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    const result = await launchCamera(options);
    if (result.assets && result.assets.length > 0) {
      const imageUri: string = result.assets[0].uri ?? '';
      Alert.alert('Selected Image:', imageUri);
      onSelectImage(imageUri);
      setOpenModel(false);
    }
  };

  const openGallery = async (): Promise<void> => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    const result = await launchImageLibrary(options);
    if (result.assets && result.assets.length > 0) {
      const imageUri: string = result.assets[0].uri ?? '';
      console.log('Selected Image from Gallery:', imageUri);
      onSelectImage(imageUri);
      setOpenModel(false);
    }
  };

  const pickDocument = async (): Promise<void> => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('Selected Document:', result.uri);
      onSelectImage(result.uri);
      setOpenModel(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled document picker');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  return (
    <Modal visible={!!openModel}>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpenModel(false);
        }}>
        <Animated.View style={[style.overlay]} />
      </TouchableWithoutFeedback>
      <View style={style.modalView}>
        <Text style={style.logoutline}></Text>
        <View style={style.AttachBox}>
          <TouchableOpacity style={style.innerAttachBox} onPress={openCamera}>
            <Image source={IMAGES.CAMER} />
            <Text style={style.attachText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.innerAttachBox} onPress={openGallery}>
            <Image source={IMAGES.GALLERY} />
            <Text style={style.attachText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.innerAttachBox} onPress={pickDocument}>
            <Image source={IMAGES.FILE} />
            <Text style={style.attachText}>Document</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
