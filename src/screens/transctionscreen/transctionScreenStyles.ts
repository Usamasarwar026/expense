import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  financialBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.PURPLE_BLUE,
    marginTop: 20,
  },
  financialBoxText: {
    color: COLORS.DARK_PURPLE,
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 15,
  },
  periodHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  periodText: {
    fontSize: 18,
    fontWeight: '600',
  },
  listbar: {
    backgroundColor: COLORS.LIGHT_GREY_SHADE,
    paddingHorizontal: 20,
  },
  flatlist: {
    flex: 1,
    marginBottom: 60,
  },
});
