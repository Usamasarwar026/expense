import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Setting(props:any) {
    const {name, image, onPress} = props
  return (
    
    <TouchableOpacity style={style.container} onPress={onPress}>
        <View style={style.imageBox}>
            <Image style={style.image} source={image}/>
        </View>
        <View>
            <Text style={style.text}>{name}</Text>
        </View>
    </TouchableOpacity>
    
  )
}

const style = StyleSheet.create({
    container: {
    
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 20,
    },
    imageBox:{
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#EEE5FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 30,
        // resizeMode: 'contain',
        // marginBottom: 20
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 10,
        // marginTop: 20
    }

})