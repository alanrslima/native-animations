// Inspiration: https://dribbble.com/shots/3147975-Product-Page-Interaction?1481310235
// Images from Pexels.com: https://www.pexels.com/collections/abstract-art-4cxqlt3/

import * as React from 'react';
import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('screen');
import AntDesign from 'react-native-vector-icons/AntDesign';
import faker from 'faker';

const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const images = [
  'https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1698394/pexels-photo-1698394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

faker.seed(10);

const DATA = [...Array(images.length).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: images[i],
    title: faker.commerce.productName(),
    subtitle: faker.company.bs(),
    price: faker.finance.amount(80, 200, 0),
  };
});
const SPACING = 20;

const Content = ({item}) => {
  return (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 16,
          textTransform: 'uppercase',
        }}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {item.title}
      </Text>
      <Text style={{fontSize: 12, opacity: 0.4}}>{item.subtitle}</Text>
      <View style={{flexDirection: 'row', marginTop: SPACING}}>
        <Text
          style={{
            fontSize: 42,
            letterSpacing: 3,
            fontWeight: '900',
            marginRight: 8,
          }}>
          {item.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 36,
            fontWeight: '800',
            alignSelf: 'flex-end',
          }}>
          USD
        </Text>
      </View>
    </>
  );
};

export default () => {
  return (
    <View style={{backgroundColor: '#A5F1FA', flex: 1}}>
      <StatusBar hidden />
      <SafeAreaView style={{marginTop: SPACING * 4}}>
        <View style={{height: IMAGE_HEIGHT * 2.1}}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            bounces={false}
            style={{flexGrow: 0}}
            contentContainerStyle={{
              height: IMAGE_HEIGHT + SPACING * 2,
              paddingHorizontal: SPACING * 2,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width,
                    paddingVertical: SPACING,
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              );
            }}
          />
          <View
            style={{
              width: IMAGE_WIDTH,
              alignItems: 'center',
              paddingHorizontal: SPACING * 2,
              marginLeft: SPACING * 2,
            }}>
            <Content item={DATA[0]} />
          </View>
          <View
            style={{
              width: IMAGE_WIDTH + SPACING * 2,
              position: 'absolute',
              backgroundColor: 'white',
              backfaceVisibility: true,
              zIndex: -1,
              top: SPACING * 2,
              left: SPACING,
              bottom: 0,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: IMAGE_WIDTH + SPACING * 4,
            paddingHorizontal: SPACING,
            paddingVertical: SPACING,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="swapleft" size={42} color="black" />
              <Text style={{fontSize: 12, fontWeight: '800'}}>PREV</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: '800'}}>NEXT</Text>
              <AntDesign name="swapright" size={42} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
