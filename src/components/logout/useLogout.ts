import { useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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
              routes: [{ name: 'TabNavigation', params: { screen: 'Home' } }],
            }),
          );
        }
      }, 500);
    } else {
      setOpenModel(false);
      Toast.show({
        text1: 'Error',
        text2: 'No user is currently signed in',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

  return {
    successModelVisible,
    setSuccessModelVisible,
    handleYesPress,
  };
}
