import {StyleSheet} from 'react-native';
import { COLORS } from '../../constant/color';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modelView: {
    width: '90%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  image: {
    width: 48,
    height: 48,
    marginBottom: 20,
  },

  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.DARK_GREY,
  },
});
