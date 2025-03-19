import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_BLACK,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GREY,
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.DARK_PURPLE,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
