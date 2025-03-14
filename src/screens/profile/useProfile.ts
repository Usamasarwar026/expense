import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchUserData, logout} from '../../store/authSlice/authSlice';
import {UserData} from '../../types/types';
import Toast from 'react-native-toast-message';
import {navigate} from '../../navigation/navigationRef/navigationRef';

export default function useProfile() {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null | undefined>(null);
  const dispatch = useAppDispatch();
  const usersData = useAppSelector(state => state.auth.usersData);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        await dispatch(fetchUserData()).unwrap();
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [dispatch]);
  useEffect(() => {
    setUserData(usersData);
  }, [usersData]); 


  const goToEditPage = () => {
    navigate('EditProfile');
  };

  const YesPress = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error: any) {
      Toast.show(error.message);
    }
  };
  return {
    loading,
    userData,
    goToEditPage,
    openModel,
    setOpenModel,
    YesPress,
  };
}
