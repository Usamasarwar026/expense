import { View, Text, Modal, TouchableWithoutFeedback, Animated, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IMAGES } from '../../constant/image'
import { useNavigation } from '@react-navigation/native'

export default function AddModel({ modalVisible, setModalVisible }:any) {
    const navigation = useNavigation();

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
            <Animated.View style={[style.overlay]} />
        </TouchableWithoutFeedback>
        <View style={style.modelView}>
            <TouchableOpacity style={style.pic1Box} onPress={goToIncome}>
                <Image source={IMAGES.WHITEINCOME}/>
            </TouchableOpacity>
            <TouchableOpacity style={style.pic2Box} onPress={goToExpense}>
                <Image source={IMAGES.WHITEEXPENSE}/>

            </TouchableOpacity>

        </View>

    </Modal>
    </>
  )
}

const style = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        
    },
    modelView:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '23%',
        padding: 20,
        flex: 1,
        flexDirection: 'row',  
        justifyContent: 'center',
        gap: 20,
    },
    pic1Box:{
        
        height: 56,
        width: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        borderRadius: 28,
        backgroundColor: '#00A86B',
        
    },
    pic2Box:{
        height: 56,
        width: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E6E6E6',
        borderRadius: 28,
        backgroundColor: '#FD3C4A',
       
    }
})