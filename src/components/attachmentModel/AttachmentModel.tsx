import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import {AttachmentProp} from '../../types/types';
import {style} from './attachmentModelStyle';
import {UseAttachmentModel} from './useAttachmentModel';

export default function AttachmentModel({
  openModel,
  setOpenModel,
  onSelectImage,
}: AttachmentProp) {
  const {openCamera, openGallery, pickDocument} = UseAttachmentModel(
    setOpenModel,
    onSelectImage,
  );
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
