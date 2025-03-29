import {useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { showToast } from '../../utils/toastUtils';

export function useLogout({
  setOpenModel,
  YesPress,
  navigateToHome = false,
}: {
  setOpenModel: (value: boolean) => void;
  YesPress?: () => Promise<void> | void | undefined;
  navigateToHome?: boolean;
}) {
  const [successModelVisible, setSuccessModelVisible] = useState(false);
  const navigation = useNavigation();

  const handleYesPress = async () => {
    setOpenModel(false);

    if (YesPress) {
      await YesPress();
      setSuccessModelVisible(true);

      setTimeout(async () => {
        setSuccessModelVisible(false);

        if (navigateToHome) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'TabNavigation', params: {screen: 'Home'}}],
            }),
          );
        }
      }, 500);
    } else {
      setOpenModel(false);
      showToast({
        type: 'error',
        message: 'Error',
        description: 'No user is currently signed in',
        
      })
    }
  };

  return {
    successModelVisible,
    setSuccessModelVisible,
    handleYesPress,
  };
}
