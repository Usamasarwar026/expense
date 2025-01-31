import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import React, { useState } from 'react';
import {IMAGES} from '../../constant/image';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AttachmentModel from '../../components/attachmentModel/AttachmentModel';

export default function Expense() {
    const [openModel, setOpenModel] = useState(false);
    const navigation = useNavigation();
    const goToHome = ()=>{
        try {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'TabNavigation', params: { screen: 'Home' } }],
                    })
                );
              } catch (error) {
                console.error('Navigation Error:', error);
              }
    }
  return (
    <>
    <View style={style.container}>
      <View style={style.topcontainer}>
        <TouchableOpacity onPress={goToHome}>
          <Image source={IMAGES.WHITEARROW}  />
        </TouchableOpacity>
        <Text style={style.topcontainerText}>Expense</Text>
      </View>
      <View style={style.secondContainer}>
        <Text style={style.secondContainerText}>How much?</Text>
        <Text style={style.secondContaineramount}>$0</Text>
      </View>
      <View style={style.belowContainer}>
        <View  style={style.belowinnerContainer}>
            <Text style={style.belowinnerContainerText}>Category</Text>
            <Image source={IMAGES.ARROW_DOWN}/>
        </View>
        <View style={style.textareaBox}>
        <TextInput
        style={style.textArea}
        placeholder="Description"
         placeholderTextColor="#91919F"
        // value={text}
        // onChangeText={setText}
        multiline={true}
        numberOfLines={2} 
      />
        </View>
        <TouchableOpacity style={style.attachBox} onPress={()=>{setOpenModel(true)}} >
            <Image source={IMAGES.ATTACHMENT}/>
            <Text style={style.belowinnerContainerText}>Add attachment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.saveButton}>
            <Text style={style.saveButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>

    <AttachmentModel openModel={openModel} setOpenModel={setOpenModel}/>
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
    paddingHorizontal: 30,
  },
  secondContainer:{
    flex: 4,
    paddingHorizontal: 20,

  },
  secondContainerText:{
    fontSize: 18,
    fontWeight: '600',
    color: '#FCFCFC',
  },
  secondContaineramount:{
    fontSize: 64,
    fontWeight: '600',
    color: '#FCFCFC',
    paddingTop: 20,
    marginBottom: 20,
  },
  belowContainer:{
    flex: 6,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 50,
    
  },
  belowinnerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    paddingVertical: 20,
    marginHorizontal: 30,
    borderRadius: 8,
    
  },
  belowinnerContainerText:{
    fontSize: 16,
    fontWeight: '400',
    color: '#91919F',
  },
  textareaBox:{
    // flex:1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 8,
  },
  textArea: {
    height: 70,
    borderColor: '#F1F1FA',
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    borderWidth: 1,
    
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top', // Align text to the top
  },
  attachBox:{
    
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
  },
  saveButton:{
    backgroundColor: '#7F3DFF',
    paddingVertical: 15,
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText:{
    fontSize: 18,
    fontWeight: '600',
    color: '#FCFCFC',
  },

});
