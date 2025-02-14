import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {IMAGES} from '../../constant/image';
import Setting from '../../components/setting/Setting';
import {ProfileData} from './profileData';
import {useNavigation} from '@react-navigation/native';
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchUserData, logout } from '../../store/authSlice/authSlice';
import LogoutModel from '../../components/logoutModel/LogoutModel';
import { styles } from './profileStyles';



export default function Profile() {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
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

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setOpenModel(false); // Reset modal when navigating
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const goToEditPage = () => {
    navigation.navigate('EditProfile');
  };

  const YesPress = async()=>{
     await dispatch(logout());
     
  }

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View style={styles.imageBox}>
          {loading ? (
            <ActivityIndicator size="small" color="#7F3DFF" />
          ):
          (
            <Image style={styles.profileImage}  source={
              userData?.profileImageUri ? { uri: userData.profileImageUri } : IMAGES.MAINPROFILE
            }  />
          )
          }
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
        {ProfileData.map(profile => {
          const handlePress = () => {
            if (profile.id === "1") {
              navigation.navigate('Budget'); // Navigate to Profile screen
            } else if (profile.id === "2") {
              navigation.navigate('ResetPassword');
            } else if (profile.id === "3") {
              
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
      <LogoutModel
      openModel={openModel}
      setOpenModel={setOpenModel}
      title="Logout?"
      description="Are you sure do you wanna logout?"
      text="You have been logged out successfully"
      YesPress={()=>YesPress}
      navigateToLogin={true} 
      
      />
    </View>

    
  );
}
