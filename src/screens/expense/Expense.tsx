import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../constant/image';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AttachmentModel from '../../components/attachmentModel/AttachmentModel';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import Input from '../../components/input/Input';

export default function Expense() {
  const [openModel, setOpenModel] = useState(false);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('All Expense');
  const [imageUri, setImageUri] = useState(null);
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();
  const goToHome = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabNavigation', params: {screen: 'Home'}}],
        }),
      );
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  return (
    <>
      <View style={style.container}>
        <View style={style.topcontainer}>
          <TouchableOpacity onPress={goToHome}>
            <Image source={IMAGES.WHITEARROW} />
          </TouchableOpacity>
          <Text style={style.topcontainerText}>Expense</Text>
        </View>
        <View style={style.secondContainer}>
          <Text style={style.secondContainerText}>How much?</Text>
          <Text style={style.secondContaineramount}>$0</Text>
        </View>
        <View style={style.belowContainer}>
          <View style={style.belowinnerContainer}>
            <CategoryDropdown
              dropdownPosition="center"
              style="AllExpense"
              type="Expense"
            />
          </View>
          <View style={style.textareaBox}>
            <TextInput
              style={style.textArea}
              placeholder="Description"
              placeholderTextColor="#91919F"
              value={text}
              onChangeText={setText}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          <View style={style.numberInputBox}>
            <Input
              style={style.numberInput}
              placeholder="Enter Expense"
              placeholderTextColor="#91919F"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
          {imageUri ? (
            <View style={style.imagePreview}>
              <Image source={{uri: imageUri}} style={style.previewImage} />
              <TouchableOpacity
                style={style.cancelButton}
                onPress={() => setImageUri(null)}>
                <Image source={IMAGES.CLOSE}/>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={style.attachBox}
              onPress={() => {
                setOpenModel(true);
              }}>
              <Image source={IMAGES.ATTACHMENT} />
              <Text style={style.belowinnerContainerText}>Add attachment</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={style.saveButton}>
            <Text style={style.saveButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AttachmentModel openModel={openModel} setOpenModel={setOpenModel} onSelectImage={uri => setImageUri(uri)} />
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FD3C4A',
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  topcontainerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    width: '55%',
  },
  inputcontainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  secondContainer: {
    flex: 4,
    paddingHorizontal: 20,
  },
  secondContainerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FCFCFC',
  },
  secondContaineramount: {
    fontSize: 64,
    fontWeight: '600',
    color: '#FCFCFC',
    paddingTop: 20,
    marginBottom: 20,
  },
  belowContainer: {
    flex: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 50,
  },
  belowinnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    paddingVertical: 20,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 8,
  },
  belowinnerContainerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#91919F',
  },
  textareaBox: {
    // flex:1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    // borderWidth: 1,
  },
  numberInputBox: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: '#F1F1FA',
    width: '100%',
    // borderWidth: 1,
  },
  numberInput: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    borderWidth: 1,
    borderColor: '#F1F1FA',
    paddingHorizontal: 10,
    // paddingVertical: 20,
    borderRadius: 8,
    // marginVertical: 20,
    width: '100%',
    height: 60,
  },
  textArea: {
    height: 60,
    borderColor: '#F1F1FA',
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    borderWidth: 1,

    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  attachBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#7F3DFF',
    paddingVertical: 15,
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FCFCFC',
  },

  imagePreview: {
    // alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cancelButton: {
    position: 'absolute',
    top: -8,
    left: 80,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
