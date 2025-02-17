import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMAGES} from '../../constant/image';
import Setting from '../../components/setting/Setting';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/useRedux';
import {fetchUserData} from '../../store/authSlice/authSlice';
import {styles} from './profileStyles';
import {UserData} from '../../types/types';
import {navigate} from '../../navigation/navigationRef';
import Logout from '../../components/logout/Logout';
import { PROFILE_DATA } from '../../constant/constant';

export default function Profile() {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null | undefined>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await dispatch(fetchUserData()).unwrap();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  const goToEditPage = () => {
    navigate('EditProfile');
  };

  const YesPress = () => {
    console.log('Button Pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View style={styles.imageBox}>
          {loading ? (
            <ActivityIndicator size="small" color="#7F3DFF" />
          ) : (
            <Image
              style={styles.profileImage}
              source={
                userData?.profileImageUri
                  ? {uri: userData.profileImageUri}
                  : IMAGES.MAINPROFILE
              }
            />
          )}
        </View>

        <View style={styles.containerRight}>
          <View>
            {loading ? (
              <ActivityIndicator size="large" color="#7F3DFF" />
            ) : (
              <>
                <Text style={styles.username}>Username</Text>
                <Text style={styles.originalName}>
                  {userData?.name || 'Guest User'}
                </Text>
              </>
            )}
          </View>
          <View>
            <TouchableOpacity onPress={goToEditPage}>
              <Image style={styles.editButton} source={IMAGES.EDIT} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.setComponent}>
        {PROFILE_DATA.map(profile => {
          const handlePress = () => {
            if (profile.id === '1') {
              navigate('SettingScreen');
            } else if (profile.id === '2') {
              navigate('ResetPassword');
            } else if (profile.id === '3') {
              setOpenModel(true);
            } else {
              console.log('Different Action for:', profile.name);
            }
          };

          return (
            <Setting
              key={profile.id}
              image={profile.image}
              name={profile.name}
              onPress={handlePress}
            />
          );
        })}
      </View>
      <View style={{flex: 1}}></View>
      <Logout
        openModel={openModel}
        setOpenModel={setOpenModel}
        title="Logout?"
        description="Are you sure do you wanna logout?"
        text="You have been logged out successfully"
        YesPress={() => YesPress()}
        navigateToLogin={true}
      />
    </View>
  );
}
