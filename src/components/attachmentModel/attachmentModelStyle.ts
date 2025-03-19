import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const style = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.LIGHT_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  logoutline: {
    borderTopColor: COLORS.LIGHT_PURPLE,
    borderTopWidth: 3,
    width: '10%',
    height: 2,
    marginBottom: 30,
  },
  AttachBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  innerAttachBox: {
    width: 107,
    height: 91,
    backgroundColor: COLORS.PURPLE_BLUE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    gap: 10,
  },
  attachText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.DARK_PURPLE,
  },
});
