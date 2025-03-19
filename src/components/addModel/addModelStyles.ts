import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SLATE_BLUE,
  },

  modelView: {
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
  pic1Box: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    backgroundColor: COLORS.GREEN,
  },
  pic2Box: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    backgroundColor: COLORS.RED,
  },
});
