import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
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
    height: '25%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  logoutline: {
    borderTopColor: '#D3BDFF',
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
    backgroundColor: '#EEE5FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    gap: 10,
  },
  attachText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F3DFF',
  },
});
