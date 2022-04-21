import {StyleSheet, Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');

const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

export const ITEM_SIZE = width * 0.38;
export const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  containerInput: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    width: ITEM_SIZE,
    alignItems: 'center',
  },
  containerText: {
    width: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperCountdown: {
    ...StyleSheet.absoluteFillObject,
    height,
    width,
    backgroundColor: colors.red,
  },
  wrapperText: {
    position: 'absolute',
    top: height / 3,
    left: 0,
    right: 0,
    flex: 1,
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: ITEM_SPACING,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  },
  containerButton: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
});
