import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  all: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  allListContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.DARK_PURPLE,
    width: '100%',
    top: 40,
    zIndex: 100,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.DARK_PURPLE,
    width: 200,
  },
  centerDropdown: {
    alignSelf: 'center',
    position: 'absolute',
    top: 40,
    zIndex: 100,
  },
  rightDropdown: {
    alignSelf: 'flex-start',
    left: 0,
    position: 'absolute',
    top: 40,
    zIndex: 100,
  },
  aboveDropdown: {
    position: 'absolute',
    top: -230,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  list: {
    padding: 10,
    flex: 1,
    overflow: 'scroll',
    flexGrow: 1,
  },
  itemButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  item: {
    fontSize: 16,
    fontWeight: '500',
  },
});
