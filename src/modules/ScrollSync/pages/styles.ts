import {StyleSheet, StatusBar} from 'react-native';

export const ICON_SIZE = 42;
export const ITEM_HEIGHT = ICON_SIZE * 2;
export const colors = {
  yellow: '#FFE8A3',
  dark: '#2D2D2D',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.dark,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
});
