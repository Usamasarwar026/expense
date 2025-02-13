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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { AttachmentProp } from '../../types/types';

export default function AttachmentModel({openModel, setOpenModel, onSelectImage}:AttachmentProp) {
    const openCamera = async () => {
        const options = {
          mediaType: 'photo',
          quality: 1,
          saveToPhotos: true,
        };
        const result = await launchCamera(options);
        if (result.assets) {
          Alert.alert('Selected Image:', result.assets[0].uri);
          onSelectImage(result.assets[0].uri)
          setOpenModel(false);
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
          onSelectImage(result.assets[0].uri)
          setOpenModel(false);
        }
      };

      const pickDocument = async () => {
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
    <Modal visible={openModel}>
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

const style = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will make the background cover the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
    // justifyContent: 'center',
    elevation: 5,
  },
  logoutline: {
    borderTopColor: '#D3BDFF',
    borderTopWidth: 3,
    width: '10%',
    height: 2,
    marginBottom: 30,
  },
  AttachBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  innerAttachBox: {
    width: 107,
    height: 91,
    backgroundColor: '#EEE5FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    gap: 10,
  },
  attachText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F3DFF',
  },
});
