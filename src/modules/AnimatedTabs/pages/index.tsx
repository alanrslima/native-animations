import React, {useRef, useState, useCallback} from 'react';
import styles, {width} from './styles';
import {
  Text,
  View,
  StatusBar,
  Image,
  Animated,
  findNodeHandle,
  TouchableOpacity,
} from 'react-native';

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={[styles.tabText, {fontSize: 84 / data.length}]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({
  measures,
  scrollX,
}: {
  measures: any;
  scrollX: Animated.Value;
}) => {
  const inputRange = data.map((_, index) => index * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={[
        styles.containerIndicator,
        {width: indicatorWidth, transform: [{translateX}]},
      ]}
    />
  );
};

const Tabs = ({data, scrollX, onItemPress}) => {
  const containerRef = React.useRef();
  const [measures, setMeasures] = useState([]);

  React.useEffect(() => {
    const m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({x, y, width, height});
          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, [data]);

  return (
    <View style={styles.containerTabs}>
      <View ref={containerRef} style={styles.contentTabs}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const onItemPress = useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        bounces={false}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <View style={styles.containerImage}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.wrapper} />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}
