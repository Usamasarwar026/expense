import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Input from '../../components/input/Input';
import {IMAGES} from '../../constant/image';
import Toast from 'react-native-toast-message';
import {styles} from './editProfileStyles';
import { useEditProfile } from './useEditProfile';

export default function EditProfile() {
  const {
    email,
    name,
    imageUri,
    loading,
    setName,
    openImagePicker,
    handleUpdateProfile,
    goToProfile,
    isButtonEnabled,
  } = useEditProfile();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToProfile}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Update Profile</Text>
          <Text></Text>
        </View>
        <View style={styles.picConatiner}>
          <View style={styles.picBox}>
            {loading ? (
              <ActivityIndicator size="large" color="#7F3DFF" />
            ) : (
              <Image
                style={styles.pic}
                source={imageUri ? {uri: imageUri} : IMAGES.MAINPROFILE}
              />
            )}
            <TouchableOpacity style={styles.editbtn} onPress={openImagePicker}>
              <Image source={IMAGES.EDIT} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputcontainer}>
          <View style={styles.inputTextfields}>
            <Text style={styles.inputText}>Email (cannot be changed)</Text>
            <Input
              style={styles.inputField}
              placeholder="Email"
              placeholderTextColor="#91919F"
              value={email}
              editable={false}
            />
          </View>
          <View style={styles.inputTextfields}>
            <Text style={styles.inputText}>Name</Text>
            <Input
              style={styles.inputField}
              placeholder="name"
              placeholderTextColor="#91919F"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isButtonEnabled ? '#7F3DFF' : '#8580bc'},
            ]}
            disabled={!isButtonEnabled}
            onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
