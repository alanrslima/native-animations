import {StyleSheet, Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('screen');

export const ITEM_WIDTH = width;
export const ITEM_HEIGHT = height * 0.75;
export const DOT_SIZE = 8;
export const DOT_SPACING = 8;
export const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: '#333',
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: '#333',
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
  },
  bottomSheetTitle: {
    fontWeight: '800',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  bottomSheetPrice: {
    fontSize: 16,
  },
  bottomSheetContent: {
    marginVertical: 20,
  },
  bottomSheetDescription: {
    marginBottom: 10,
    lineHeight: 22,
  },
});
