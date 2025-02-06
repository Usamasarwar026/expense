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
import Logout from '../logout/Logout';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function Profile() {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const goToEditPage = () => {
    navigation.navigate('EditProfile');
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser; 
        if (user) {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            console.log('User data not found');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // const logoutModel = ()=>{
   
  // }
  return (
    <View style={style.container}>
      <View style={style.topcontainer}>
        <View style={style.imageBox}>
          <Image style={style.profileImage} source={IMAGES.MAINPROFILE} />
        </View>

        <View style={style.containerRight}>
          <View>
          {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <>
                <Text style={style.username}>Username</Text>
                <Text style={style.originalName}>
                  {userData ? userData.name : 'Guest User'}
                </Text>
              </>
            )}
          </View>
          <View>
            <TouchableOpacity onPress={goToEditPage}>
              <Image style={style.editButton} source={IMAGES.EDIT} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.setComponent}>
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
      <Logout
      openModel={openModel}
      setOpenModel={setOpenModel}
      title="Logout?"
      description="Are you sure do you wanna logout?"
      text="You have been logged out successfully"
      
      />
    </View>

    
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: 20,
  },
  topcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    paddingHorizontal: 20,
    // marginBottom: 20,
  },
  containerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 60,
    // borderWidth: 2,  //outline for the picture
    borderColor: 'red',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',
  },
  originalName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#161719',
  },
  editButton: {
    width: 40,
    height: 40,
  },
  setComponent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 26,
    marginTop: 40,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  


});
