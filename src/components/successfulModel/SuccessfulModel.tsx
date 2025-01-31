import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import { IMAGES } from '../../constant/image';

export default function SuccessfulModel({openModel,setOpenModel,text}:any) {
  return (
    <Modal visible={openModel} animationType="fade" transparent={true}>
      
      <TouchableWithoutFeedback onPress={()=>{setOpenModel(false)}}>
        <Animated.View style={[style.overlay]} />
      </TouchableWithoutFeedback>
      <View style={style.modalContainer}>
      <View style={style.modelView}>
        <Image source={IMAGES.SUCCESS} style={style.image}/>
        <Text style={style.text}>{text}</Text>
      </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  
  },
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  modelView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
  },
  image: {
    width: 48, 
    height: 48, 
    marginBottom: 20, 
  },

  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});
