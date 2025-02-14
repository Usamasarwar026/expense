import { View, Modal, TouchableWithoutFeedback, Animated, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IMAGES } from '../../constant/image'
import { useNavigation } from '@react-navigation/native'
import { AddModelProps, NavigationProps } from '../../types/types';
import {styles} from './addModelStyles';

export default function AddModel({ modalVisible, setModalVisible }: AddModelProps) {
    const navigation = useNavigation<NavigationProps>();

    const goToExpense = ()=>{
        navigation.navigate('Expense');
    }
    const goToIncome = ()=>{
        navigation.navigate('Income');
    }
  return (
    <>
    <Modal visible={modalVisible} animationType="fade" transparent={true} >
        <TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}>
            <Animated.View style={[styles.overlay]} />
        </TouchableWithoutFeedback>
        <View style={styles.modelView}>
            <TouchableOpacity style={styles.pic1Box} onPress={goToIncome}>
                <Image source={IMAGES.WHITEINCOME}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pic2Box} onPress={goToExpense}>
                <Image source={IMAGES.WHITEEXPENSE}/>

            </TouchableOpacity>

        </View>

    </Modal>
    </>
  )
}
