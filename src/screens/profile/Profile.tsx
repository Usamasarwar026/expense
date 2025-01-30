import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import Setting from '../../components/setting/Setting';
import {ProfileData} from './profileData';
import {useNavigation} from '@react-navigation/native';



export default function Profile() {
  const [openModel, setOpenModel] = React.useState(false);
  const navigation = useNavigation();

  const goToEditPage = () => {
    navigation.navigate('EditProfile');
  };

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
            <Text style={style.username}>Username</Text>
            <Text style={style.originalName}>Iriana Saliha</Text>
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

       <Modal visible={openModel} animationType='slide' transparent={true}>
       <TouchableWithoutFeedback onPress={()=>setOpenModel(false)}>
        <Animated.View style={[style.overlay]} />
      </TouchableWithoutFeedback>
      <View style={style.modalView}>
        <Text style={style.logoutline}></Text>
        <Text style={style.logout}>Logout?</Text>
        <Text style={style.modalText}>Are you sure do you wanna logout?</Text>
        <View style={style.logoutbtn}>
        <TouchableOpacity onPress={() => {setOpenModel(false)}} style={style.button}>
          <Text style={style.buttonText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {Alert.alert('Logged Out'); setOpenModel(false)}} style={style.button1}>
          <Text style={style.buttonText1}>Yes</Text>
        </TouchableOpacity>
        </View>
      </View>
      
  
    </Modal>
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

  modalView:{

  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '30%', // Adjust height as needed
  backgroundColor: 'white',
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5, // Adds shadow effect
  },
  logoutline:{
    borderTopColor: "#D3BDFF",
    borderTopWidth: 3,
    width: '10%',
    height: 2,
    marginBottom: 15,
    
  },
  logout:{
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutbtn:{
    flexDirection: 'row',
    justifyContent:'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modalText:{
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#91919F'
  },
  button:{
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingBottom:18,
    paddingTop:18,
    backgroundColor: '#EEE5FF',
    marginBottom: 10,
  },
  button1:{
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingBottom:18,
    paddingTop:18,
    backgroundColor: '#7F3DFF',
    marginBottom: 10,
  },
  buttonText:{
    color: '#7F3DFF',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  buttonText1:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will make the background cover the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for blur effect
    justifyContent: 'center',
    alignItems: 'center',
  },

});
