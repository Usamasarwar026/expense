import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    flexGrow: 1,
    width: '100%',
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topcontainerText: {
    fontSize: 16,
    fontWeight: '700',
    width: '70%',
  },
  inputcontainer: {
    flex: 3,
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
  label: {
    paddingHorizontal: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  btntext: {
    color: COLORS.MUTED_GREY,
  },
  labelText: {
    color: COLORS.VIVID_VIOLET,
    textDecorationLine: 'underline',
  },
  btn: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  orText: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  googletext: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  googleSign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  login: {
    flex: 3,
    alignItems: 'center',
    fontSize: 16,
    marginBottom: 5,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.DARK_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checked: {
    backgroundColor: COLORS.DARK_PURPLE,
  },
  checkmark: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});
