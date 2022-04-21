import * as React from 'react';
import {Image, Animated, View, StatusBar, Text} from 'react-native';
import styles, {ITEM_HEIGHT, DOT_INDICATOR_SIZE, height} from './styles';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const images = [
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const product = {
  title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
  description: [
    'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
    ,
  ],
  price: '29.99£',
};

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.containerScroll}>
        <Animated.FlatList
          data={images}
          keyExtractor={(_, index) => `${index}`}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({item}) => {
            return (
              <View>
                <Image source={{uri: item}} style={styles.image} />
              </View>
            );
          }}
        />
        <View style={styles.pagination}>
          {images.map((_, index) => {
            return <View key={index} style={[styles.dot]} />;
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT,
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR_SIZE],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        onChange={handleSheetChanges}
        snapPoints={[height - ITEM_HEIGHT, height]}>
        <BottomSheetScrollView contentContainerStyle={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>{product.title}</Text>
          <Text style={styles.bottomSheetPrice}>{product.price}</Text>
          <View style={styles.bottomSheetContent}>
            {product.description.map((txt, index) => {
              return (
                <Text key={index} style={styles.bottomSheetDescription}>
                  {txt}
                </Text>
              );
            })}
          </View>
          <View style={styles.bottomSheetContent}>
            {product.description.map((txt, index) => {
              return (
                <Text key={index} style={styles.bottomSheetDescription}>
                  {txt}
                </Text>
              );
            })}
          </View>
          <View style={styles.bottomSheetContent}>
            {product.description.map((txt, index) => {
              return (
                <Text key={index} style={styles.bottomSheetDescription}>
                  {txt}
                </Text>
              );
            })}
          </View>
          <View style={styles.bottomSheetContent}>
            {product.description.map((txt, index) => {
              return (
                <Text key={index} style={styles.bottomSheetDescription}>
                  {txt}
                </Text>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};
