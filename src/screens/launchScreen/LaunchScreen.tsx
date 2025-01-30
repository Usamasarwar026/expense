import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function LaunchScreen() {
  const navigation = useNavigation();


  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignUp'); // Now 'SignUp' is correctly typed
    }, 1000); // 3 seconds delay
  }, [navigation]);
 
  return (
    <>
    <View style={style.container}>
      <View style={style.textWrapper}>
        <Image
          source={require('../../assets/images/backimg.png')} 
          style={style.backgroundImage}
          resizeMode="cover" 
        />
        
        <Text style={style.text}>montra</Text>
      </View>
    </View>
    </>
  )

}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7F3DFF', 
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, 
    height: 100, 
    position: 'relative', 
  },
  backgroundImage: {
    position: 'absolute', 
    width: '30%',
    height: '90%',
    borderRadius: 10, 
    left:40,
    top: 10,
  },
  text: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});