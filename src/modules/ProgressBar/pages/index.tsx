import React, {useRef, useState, useEffect} from 'react';
import {Text, View, StatusBar, Animated} from 'react-native';
import styles from './styles';

interface ProgressProps {
  step: number;
  steps: number;
  height: number;
}
const Progress = ({step, steps, height}) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, reactive]);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width, reactive, steps]);

  return (
    <>
      <Text style={styles.textProgressStep}>
        {step}/{steps}
      </Text>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={[styles.containerProgress, {height, borderRadius: height}]}>
        <Animated.View
          style={[
            styles.contentProgress,
            {
              height,
              borderRadius: height,
              transform: [{translateX: animatedValue}],
            },
          ]}
        />
      </View>
    </>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Progress step={index} steps={10} height={20} />
    </View>
  );
}
