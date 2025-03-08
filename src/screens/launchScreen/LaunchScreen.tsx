import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {styles} from './launchScreenStyles';
import {IMAGES} from '../../constant/image';

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
            source={IMAGES.BACK_IMAGE}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <Text style={styles.text}>montra</Text>
        </View>
      </View>
    </>
  );
}
