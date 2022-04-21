import * as React from "react";
import {
  StatusBar,
  Animated,
  TouchableOpacity,
  Vibration,
  View,
  TextInput,
} from "react-native";
import styles, { ITEM_SIZE, height } from "./styles";
const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));

export default () => {
  const inputRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = React.useState(timers[0]);
  const timerAnimation = React.useRef(new Animated.Value(height)).current;
  const textInputAnimation = React.useRef(new Animated.Value(0)).current;
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });

    return () => {
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    };
  });

  const animation = React.useCallback(() => {
    textInputAnimation.setValue(duration);

    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),

        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(400),
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();

      textInputAnimation.setValue(duration);

      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [duration, buttonAnimation, timerAnimation, textInputAnimation]);

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          styles.wrapperCountdown,
          { transform: [{ translateY: timerAnimation }] },
        ]}
      />
      <Animated.View
        style={[
          styles.containerButton,
          { opacity, transform: [{ translateY }] },
        ]}
      >
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.wrapperText}>
        <Animated.View
          style={[styles.containerInput, { opacity: textOpacity }]}
        >
          <TextInput
            ref={inputRef}
            style={styles.text}
            defaultValue={duration.toString()}
          />
        </Animated.View>
        <Animated.FlatList
          data={timers}
          horizontal
          style={[styles.scroll, { opacity }]}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(
              ev.nativeEvent.contentOffset.x / ITEM_SIZE
            );
            setDuration(timers[index]);
          }}
          snapToInterval={ITEM_SIZE}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyExtractor={(item) => item.toString()}
          decelerationRate="fast"
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });

            return (
              <View style={styles.containerText}>
                <Animated.Text
                  style={[styles.text, { opacity, transform: [{ scale }] }]}
                >
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
