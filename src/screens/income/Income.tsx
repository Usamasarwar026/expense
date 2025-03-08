import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import AttachmentModel from '../../components/attachmentModel/AttachmentModel';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import Input from '../../components/input/Input';
import SuccessfulModel from '../../components/successfulModel/SuccessfulModel';
import Toast from 'react-native-toast-message';
import {styles} from './incomeStyles';
import useIncome from './useIncome';

export default function Income() {
  const {
    goToHome,
    setCategory,
    description,
    setDescription,
    amount,
    setAmount,
    imageUri,
    setImageUri,
    openModel,
    setOpenModel,
    saveData,
    income,
    successfullModel,
    setSuccessfulModel,
  } = useIncome();

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToHome}>
            <Image source={IMAGES.WHITEARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Income</Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.secondContainerText}>How much?</Text>
          <Text style={styles.secondContaineramount}>
            {income}
          </Text>
        </View>
        <View style={styles.belowContainer}>
          <View style={styles.belowinnerContainer}>
            <CategoryDropdown
              dropdownPosition="center"
              style="AllExpense"
              type="Income"
              setCategory={setCategory}
            />
          </View>
          <View style={styles.textareaBox}>
            <TextInput
              style={styles.textArea}
              placeholder="Description"
              placeholderTextColor="#91919F"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          <View style={styles.numberInputBox}>
            <Input
              style={styles.numberInput}
              placeholder="Enter Income"
              placeholderTextColor="#91919F"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          {imageUri ? (
            <View style={styles.imagePreview}>
              <Image source={{uri: imageUri}} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setImageUri(null)}>
                <Image source={IMAGES.CLOSE} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.attachBox}
              onPress={() => {
                setOpenModel(true);
              }}>
              <Image source={IMAGES.ATTACHMENT} />
              <Text style={styles.belowinnerContainerText}>Add attachment</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={saveData}>
            <Text style={styles.saveButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AttachmentModel
        openModel={openModel}
        setOpenModel={setOpenModel}
        onSelectImage={uri => {
          setImageUri(uri);
        }}
      />
      <SuccessfulModel
        openModel={successfullModel}
        setOpenModel={setSuccessfulModel}
        text="Transaction has been successfully added"
      />
      <Toast />
    </>
  );
}
