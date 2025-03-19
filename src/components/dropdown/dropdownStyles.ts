import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.DARK_PURPLE,
    width: 200,
    top: 40,
    zIndex: 100,
  },
  centerDropdown: {
    alignSelf: 'center',
  },
  rightDropdown: {
    alignSelf: 'flex-start',
    left: 0,
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
