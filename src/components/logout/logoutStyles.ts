import {StyleSheet} from 'react-native';
import { COLORS } from '../../constant/color';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  logoutline: {
    borderTopColor: COLORS.LIGHT_PURPLE,
    borderTopWidth: 3,
    width: '10%',
    height: 2,
    marginBottom: 15,
  },
  logout: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.MUTED_GREY,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingBottom: 18,
    paddingTop: 18,
    backgroundColor: COLORS.PURPLE_BLUE,
    marginBottom: 10,
  },
  button1: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingBottom: 18,
    paddingTop: 18,
    backgroundColor: COLORS.DARK_PURPLE,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.DARK_PURPLE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
