import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  containerProgress: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  contentProgress: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  textProgressStep: {
    fontFamily: 'Menlo',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
});
