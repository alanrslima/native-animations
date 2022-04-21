import {StyleSheet} from 'react-native';
const SPACING = 20;
const AVATAR_SIZE = 70;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 12,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 18,
    opacity: 0.7,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    color: '#0099cc',
  },
});
