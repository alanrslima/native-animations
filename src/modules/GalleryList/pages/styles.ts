import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerImage: {
    width,
    height,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
