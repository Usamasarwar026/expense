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
import { styles } from './successfulModelStyles';

export default function SuccessfulModel({openModel,setOpenModel,text}:any) {
  return (
    <Modal visible={openModel} animationType="fade" transparent={true}>
      
      <TouchableWithoutFeedback onPress={()=>{setOpenModel(false)}}>
        <Animated.View style={[styles.overlay]} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
      <View style={styles.modelView}>
        <Image source={IMAGES.SUCCESS} style={styles.image}/>
        <Text style={styles.text}>{text}</Text>
      </View>
      </View>
    </Modal>
  );
}
