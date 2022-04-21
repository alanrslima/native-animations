import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, StatusBar, Animated} from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign';
import styles from './styles';

interface CircleProps {
  onPress: () => void;
  animatedValue: Animated.Value;
}
const Circle: React.FC<CircleProps> = ({onPress, animatedValue}) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['gold', 'gold', 'gold', '#444', '#444'],
  });
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#444', '#444', '#444', 'gold', 'gold'],
  });
  const rotateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-90deg', '-180deg'],
  });
  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 8, 1],
  });
  const translateX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0%', '50%', '0%'],
  });
  const perspective = 400;

  return (
    <Animated.View
      style={[styles.circleContainer, {backgroundColor: containerBg}]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [{perspective}, {rotateY}, {scale}, {translateX}],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <AntDesing name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const Main: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 2000,
      useNativeDriver: false,
    });

  const [index, setIndex] = useState(0);

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
};

export default Main;
