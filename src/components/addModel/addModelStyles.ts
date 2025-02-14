import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modelView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '23%',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  pic1Box: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6E6E6',
    borderRadius: 28,
    backgroundColor: '#00A86B',
  },
  pic2Box: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6E6E6',
    borderRadius: 28,
    backgroundColor: '#FD3C4A',
  },
});
