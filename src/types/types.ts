import {
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {FC} from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import { RouteProp} from '@react-navigation/native';
import {IconProps} from 'react-native-vector-icons/Icon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  title: string;
  subtitle: string;
  amount: number;
  time: string;
  image: {uri: string};
  type: string;
  onPress?: ()=>void;
};
export type ImageProp = {
  uri: string;
};

export type AttachmentProp = {
  openModel: boolean;
  setOpenModel: (value: boolean) => void;
  onSelectImage: (uri: string) => void;
};

export type ImagePickerResponse = {
  assets?: {uri: string}[];
};

export type DropdownItem = {
  id: string | number;
  value: string;
  label: string;
};
export type CategoryDropdownProps = {
  dropdownPosition?: 'center' | 'left' | 'above';
  type: 'All' | 'Expense' | 'Income';
  style?: string;
  setCategory?: (category: string) => void;
};
export type DropdownProps = {
  dropdownPosition?: 'center' | 'left';
  setSelectedMonth: (month: string) => void;
};

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
  YesPress?: () => Promise<void> | void | undefined;
  navigateToHome?: boolean;
  navigateToLogin?: boolean;
};
export type ProgressBarProps = {
  categoryName: string;
  amount: string | number;
  progress: number;
  color: string;
  textColor: string;
  onPress?: () => void;
};

export type SuccessfulModelProps = {
  openModel: boolean;
  setOpenModel: (value: boolean) => void;
  text: string;
};
export type Transaction = {
  timestamp: string;
  [key: string]: any;
};


export type TransactionHeader = {
  type: 'header';
  title: string;
}

export type TransactionItem = {
  type: 'transaction';
  data: Transaction;
}

export type CombinedData = (TransactionHeader | TransactionItem)[];

export type GroupedTransactions = {
  Today: Transaction[];
  Yesterday: Transaction[];
  'This Week': Transaction[];
  'This Month': Transaction[];
  Older: Transaction[];
  [key: string]: Transaction[];
};

export type TimeReturnType =
  | GroupedTransactions
  | Record<string, Transaction[]>;

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
  DetailTransaction: {transaction: ParamTransaction};
  FinancialReport: undefined;
};

export type DetailTransactionRouteProp = RouteProp<
  RootStackParamList1,
  'DetailTransaction'
>;

export type categoryColorsType = {
  Shopping: string;
  Subscription: string;
  Food: string;
  Salary: string;
  Transportation: string;
};

export type TransactionFilters = {
  type: 'income' | 'expense' | null;
  sortBy: 'Highest' | 'Lowest' | 'Newest' | 'Oldest';
  category: string;
};

export type TransctionModelProps = {
  visible: boolean;
  onClose: () => void;
  filters: TransactionFilters;
  setFilters: (filters: TransactionFilters) => void;
  applyFilters: () => void;
  setCategory?: (category: string) => void;
  resetFilters?: ()=>void
};

export type CurrencyModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectCurrency: (currency: string) => void;
}


export type UserProfile = {
  name: string;
  email: string;
  profileImageUri: string | null;
};

export type ImagePickerResult = {
  assets?: {uri: string}[];
};

export type FetchUserDataResponse = {
  profileImageUri: string | null;
  name: string;
  email: string;
};

export type TransactionData = {
  id: string;
  amount: string;
  category: string;
  description?: string;
  timestamp: string;
  type: 'Income' | 'Expense';
  imageUri?: string;
};

export type UserData = {
  profileImageUri?: string;
  name?: string;
  email?: string;
};

export type SliceTransaction = {
  id: string;
  userId: string;
  category: string;
  description: string;
  amount: string;
  imageUri: string;
  type: string;
  timestamp: string;
};

export interface TransactionDataSlice {
  id: string;
  userId: string;
  category: string;
  description: string;
  amount: string;
  imageUri: string;
  type: string;
  timestamp: string;
}

export type ExchangeRates ={
  [currency: string]: number;
}
export interface TransactionState {
  transactions: TransactionDataSlice[];
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedCurrency: string ;
  exchangeRates: ExchangeRates;
}

export interface AddTransactionPayload {
  category: string;
  description: string;
  amount: string;
  imageUri: string;
  type: string;
}

export type DeleteTransactionPayload = string;

export type AuthUser = {
  uid: string;
  name?: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  profileImageUri?: string;
};
export type UserDatas ={
  profileImageUri?: string;
  name?: string;
  email?: string;
}

export type UsersData = Record<string, UserData>;

export type User = {
  uid: string;
  name?: string;
  email: string;
  profileImageUri?: string;
};

export type SettingProps = {
  name: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

export type PieChartSection = {
  percentage: number;
  color: string;
};

export type PieChartProps = {
  radius: number;
  sections: PieChartSection[];
  strokeWidth?: number;
};


export type ChartData = {
  labels: string[];
  datasets: {
    data: number[]; 
    color?: (opacity: number) => string; 
    strokeWidth?: number; 
  }[];
}