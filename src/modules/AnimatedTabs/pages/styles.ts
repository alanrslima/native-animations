import {StyleSheet, Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    width,
    height,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  containerTabs: {
    position: 'absolute',
    top: 100,
    width,
  },
  contentTabs: {
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row',
  },
  tabText: {
    color: 'white',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  containerIndicator: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'white',
    bottom: -10,
    left: 0,
  },
});
