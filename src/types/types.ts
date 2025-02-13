import { KeyboardType, StyleProp, TextStyle, ViewStyle } from "react-native";
import { FC } from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { IconProps } from 'react-native-vector-icons/Icon';

export type TabItem = {
  id: number;
  name: string;
  component: FC<any>;
  icon: IconProps['name'];
  headerShown?: BottomTabNavigationOptions['headerShown'];
  isAddButton?: boolean;
};
export type TabsArray = TabItem[];

export type RootStackParamList = {
    LaunchScreen: undefined;
    SignUp: undefined;
    Login: undefined;
    Forget: undefined;
    Home: undefined;
    TabNavigation: undefined;
    EditProfile: undefined;
    profile: undefined;
    ResetPassword: undefined;
    Logout: undefined;
    FinancialReport: undefined;
    DetailTransction: undefined;
    AddModel: undefined;
    Expense: undefined;
    Income: undefined;
    name?: undefined;
  };

  export type TransctionProp = {
    title: string,
    subtitle: string,
    amount: number,
    time: string,
    image: { uri: string },
    type: string
  }
  export type ImageProp = {
    uri: string,
    
  }

  // openModel, setOpenModel, onSelectImage
 export type AttachmentProp = {
    openModel: () => void,
    setOpenModel: (value: boolean) => void,
    onSelectImage: (uri: string) => void,
  //   image: ImageProp,
  //   style?: StyleProp<ViewStyle>,
 }






  // export type signupInput = {
  //   style: StyleProp<TextStyle>;
  //   keyboardType: KeyboardType;
  //   placeholder: string;
  //   placeholderTextColor: string;
  //   value: string;
  //   onChangeText: (text: string) => void;
  //   secureTextEntry?: boolean;

  // }