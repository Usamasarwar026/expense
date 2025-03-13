import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GREY_WHITE,
    paddingTop: 20,
  },
  topcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  containerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.PURPLE_PINK,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.MUTED_GREY,
  },
  originalName: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.DARK_GREY_BLACK,
  },
  editButton: {
    width: 40,
    height: 40,
  },
  setComponent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 26,
    marginTop: 40,
    marginHorizontal: 25,
  },
});
