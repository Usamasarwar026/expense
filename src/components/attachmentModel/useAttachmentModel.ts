import {useCallback} from 'react';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

export function UseAttachmentModel(
  setOpenModel: (visible: boolean) => void,
  onSelectImage: (uri: string) => void,
) {
  const openCamera = useCallback(() => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options).then(result => {
      if (result.assets && result.assets.length > 0) {
        onSelectImage(result?.assets?.[0]?.uri ?? '');
        setOpenModel(false);
      }
    });
  }, [setOpenModel, onSelectImage]);

  const openGallery = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options).then(result => {
      if (result.assets && result.assets.length > 0) {
        onSelectImage(result.assets[0].uri ?? '');
        setOpenModel(false);
      }
    });
  }, [setOpenModel, onSelectImage]);

  const pickDocument = useCallback(() => {
    DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    })
      .then(result => {
        onSelectImage(result.uri);
        setOpenModel(false);
      })
      .catch(err => {
        if (!DocumentPicker.isCancel(err)) {
          console.error('Error picking document:', err);
        }
      });
  }, [setOpenModel, onSelectImage]);

  return {openCamera, openGallery, pickDocument};
}
