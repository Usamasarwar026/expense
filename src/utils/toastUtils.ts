import Toast from 'react-native-toast-message';
import {ShowToastParams} from '../types/types';

export const showToast = ({
  type = 'success',
  message,
  description,
  position = 'top',
  duration = 3000,
}: ShowToastParams) => {
  Toast.show({
    type,
    text1: message,
    text2: description,
    position,
    visibilityTime: duration,
  });
};
