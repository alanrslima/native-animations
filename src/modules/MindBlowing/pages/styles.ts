import {StyleSheet} from 'react-native';

export const CIRCLE_SIZE = 100;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: 'gold',
  },
  circle: {
    backgroundColor: '#444',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
