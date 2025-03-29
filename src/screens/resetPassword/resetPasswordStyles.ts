import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topcontainerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  inputcontainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  inputField: {
    width: 343,
    height: 56,
    borderColor: COLORS.LIGHT_GREY,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: COLORS.BLACK,
  },

  textcontainer: {
    flex: 1,
    width: 343,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  forgettext: {
    fontSize: 24,
    fontWeight: '600',
  },

  labelText: {
    color: COLORS.VIVID_VIOLET,
  },

  btn: {
    flex: 6,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 343,
    height: 56,
    backgroundColor: COLORS.DARK_PURPLE,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
});
