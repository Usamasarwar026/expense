import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  TransctionContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: 89,
    backgroundColor: COLORS.OFF_WHITE,
    marginHorizontal: 20,
    borderRadius: 24,
    marginBottom: 6,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainerImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  text1: {
    fontSize: 16,
    fontWeight: '500',
  },
  text2: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.MUTED_GREY,
  },
  text4: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.MUTED_GREY,
    textAlign: 'right',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '78%',
  },
  text3: {
    fontSize: 16,
    fontWeight: '600',
  },
  red: {
    color: COLORS.RED_SALSA,
  },
  green: {
    color: COLORS.EMERALD_GREEN,
  },
  pricebox: {
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'flex-end',
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{translateX: -12}, {translateY: -12}],
  },
});
