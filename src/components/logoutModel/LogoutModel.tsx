import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function LogoutModel() {
    
  return (
    <Modal  animationType='slide' transparent={true}>
        <View style={style.container}>

        </View>

    </Modal>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },

 
})