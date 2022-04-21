import * as React from "react";
import { StatusBar, Image, Animated, View, StyleSheet } from "react-native";
import faker from "@faker-js/faker";
import styles from "./styles";
import Item from "../components/Item";

const ITEM_SIZE = 70 + 20 * 3;
const BG_IMG =
  "https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men",
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        blurRadius={80}
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.FlatList
        contentContainerStyle={styles.scroll}
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityinputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityinputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View style={{ opacity, transform: [{ scale }] }}>
              <Item
                profile={item.image}
                title={item.name}
                subTitle={item.jobTitle}
                description={item.email}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
