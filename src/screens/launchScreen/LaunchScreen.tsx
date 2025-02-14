import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {navigate} from '../../navigation/navigationRef';
import { styles } from './launchScreenStyles';

export default function LaunchScreen() {
  useEffect(() => {
    setTimeout(() => {
      navigate('SignUp');
    }, 1000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Image
            source={require('../../assets/images/backImg.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />

          <Text style={styles.text}>montra</Text>
        </View>
      </View>
    </>
  );
}
