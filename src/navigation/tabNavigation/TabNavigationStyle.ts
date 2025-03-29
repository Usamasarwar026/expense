import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 60,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 0,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  curvedTabBar: {
    position: 'absolute',
    height: 60,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  addButton: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.DARK_PURPLE,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
