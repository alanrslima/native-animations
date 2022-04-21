import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png',
  },
];

const Indicator = ({scrollX}: {scrollX: Animated.Value}) => {
  return (
    <View style={styles.containerIndicator}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={[styles.indicator, {opacity, transform: [{scale}]}]}
          />
        );
      })}
    </View>
  );
};

const Square = ({scrollX}: {scrollX: Animated.Value}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={[styles.square, {transform: [{rotate}, {translateX}]}]}
    />
  );
};

const Backdrop = ({scrollX}: {scrollX: Animated.Value}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });

  return (
    <Animated.View style={[styles.containerBackdrop, {backgroundColor}]} />
  );
};

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <FlatList
        data={DATA}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentScroll}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <View style={styles.containerImage}>
              <View style={styles.contentImage}>
                <Image source={{uri: item.image}} style={styles.image} />
              </View>
              <View style={styles.containerBottom}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  contentImage: {
    flex: 0.7,
    justifyContent: 'center',
  },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
  },
  containerBottom: {
    flex: 0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontWeight: '300',
    color: 'white',
  },
  contentScroll: {
    paddingBottom: 100,
  },
  containerIndicator: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  containerBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  square: {
    width: height,
    height,
    backgroundColor: '#FFF',
    borderRadius: 86,
    top: -height * 0.65,
    left: -height * 0.3,
    position: 'absolute',
  },
});
