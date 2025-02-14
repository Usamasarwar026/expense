import { KeyboardType, StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { FC } from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { IconProps } from 'react-native-vector-icons/Icon';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

  export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

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

 export type ImagePickerResponse = {
   assets?: { uri: string }[];
 };

export type DropdownItem = {
  id: string | number;
  value: string;
  label: string;
};

// export type CategoryDropdownProps = {
//   dropdownPosition?: 'center' | 'left' | 'above'; // Define allowed positions
//   type?: 'All' | 'Expense' | 'Income'; // Define category type
//   style?: string; // Accepts different styling options
// };

// export type DropdownProps = {
//   dropdownPosition?: "center" | "left";
//   // setSelectedMonth: (month: string) => void;
// };

export interface InputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export type AddModelProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};


export type LogoutModelProps = {
  openModel: boolean;
  setOpenModel: (value: boolean) => void;
  title: string;
  description: string;
  text: string;
  YesPress?: () => Promise<void> | void;
  navigateToHome?: boolean;
  navigateToLogin?: boolean;
}

export type ProgressBarProps = {
  categoryName: string;
  amount: string | number;
  progress: number;
  color: string;
  textColor: string;
  onPress?: () => void;
}

export type SuccessfulModelProps = {
  openModel: boolean;
  setOpenModel: (value: boolean) => void;
  text: string;
}
export type Transaction = {
  id: string; // Unique ID for the transaction
  amount: number; // Transaction amount
  timestamp: string; // ISO date string
  category?: string; // Optional category
}

export type GroupedTransactions = {
  Today: Transaction[];
  Yesterday: Transaction[];
  "This Week": Transaction[];
  "This Month": Transaction[];
  Older: Transaction[];
}

export type TimeReturnType = GroupedTransactions | Record<string, Transaction[]>;

export type ParamTransaction = {
  id: string;
  type: string;
  amount: number;
  description: string;
  category: string;
  timestamp?: string;
  time?: string;
  imageUri?: string;
};

export type RootStackParamList1 = {
  DetailTransaction: { transaction: ParamTransaction };
  FinancialReport: undefined;
};

// Define the type for route and navigation props
export type DetailTransactionRouteProp = RouteProp<RootStackParamList1, 'DetailTransaction'>;
//   // export type signupInput = {
//   //   style: StyleProp<TextStyle>;
//   //   keyboardType: KeyboardType;
//   //   placeholder: string;
//   //   placeholderTextColor: string;
//   //   value: string;
//   //   onChangeText: (text: string) => void;
//   //   secureTextEntry?: boolean;

//   // }

export type categoryColorsType = {
  Shopping: string;
  Subscription: string;
  Food: string;
  Salary: string;
  Transportation: string;
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