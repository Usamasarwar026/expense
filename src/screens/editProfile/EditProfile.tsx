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
import { COLORS } from '../../constant/color';

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
              <ActivityIndicator size="large" color={COLORS.DARK_PURPLE} />
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
              placeholderTextColor={COLORS.MUTED_GREY}
              value={email}
              editable={false}
            />
          </View>
          <View style={styles.inputTextfields}>
            <Text style={styles.inputText}>Name</Text>
            <Input
              style={styles.inputField}
              placeholder="name"
              placeholderTextColor={COLORS.MUTED_GREY}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isButtonEnabled ? COLORS.DARK_PURPLE : COLORS.SOFT_PURPLE},
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
