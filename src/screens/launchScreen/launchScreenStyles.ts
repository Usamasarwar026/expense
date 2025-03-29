import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DARK_PURPLE,
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
    left: 40,
    top: 10,
  },
  text: {
    fontSize: 56,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
});
