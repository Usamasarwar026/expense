import Home from '../screens/home/Home';
import TransctionScreen from '../screens/transctionscreen/TransctionScreen';
import Budget from '../screens/budget/Budget';
import Profile from '../screens/profile/Profile';
import { TabsArray } from '../types/types';
import Login from '../screens/login/Login';
import SignUp from '../screens/signup/SignUp';
import Forget from '../screens/forget/Forget';
import TabNavigation from '../navigation/tabNavigation/TabNavigation';
import EditProfile from '../screens/editProfile/EditProfile';
import Logout from '../screens/logout/Logout';
import ResetPassword from '../screens/resetPassword/ResetPassword';
import FinancialReport from '../screens/financialReport/FinancialReport';
import DetailTransction from '../screens/detailTransction/DetailTransction';
import AddModel from '../components/addModel/AddModel';
import Expense from '../screens/expense/Expense';
import Income from '../screens/income/Income';

export const AUTH_SCREENS = [
  { name: 'Login', component: Login },
  { name: 'SignUp', component: SignUp },
  { name: 'Forget', component: Forget },
];

export const APP_SCREENS = [
  { name: 'TabNavigation', component: TabNavigation },
  { name: 'EditProfile', component: EditProfile },
  { name: 'Logout', component: Logout },
  { name: 'ResetPassword', component: ResetPassword },
  { name: 'FinancialReport', component: FinancialReport },
  { name: 'DetailTransction', component: DetailTransction },
  { name: 'AddModel', component: AddModel },
  { name: 'Expense', component: Expense },
  { name: 'Income', component: Income },
];


export const TABS: TabsArray = [
  {
    id: 1,
    name: 'Home',
    component: Home,
    icon: 'home',
    headerShown: false,
  },
  {
    id: 2,
    name: 'TransctionScreen',
    component: TransctionScreen,
    icon: 'list',
    headerShown: false,
  },
  {
    id: 3,
    name: 'Add',
    component: AddModel,
    icon: 'add',
    isAddButton: true, 
  },
  {
    id: 4,
    name: 'Budget',
    component: Budget,
    icon: 'pie-chart',
    headerShown: false,
  },
  {
    id: 5,
    name: 'Profile',
    component: Profile,
    icon: 'person',
    headerShown: false,
  },
];
