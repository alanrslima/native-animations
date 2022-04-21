import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

const Item: React.FC = () => {
  const onPress = (e: GestureResponderEvent) => {
    console.log(e.nativeEvent.changedTouches.length);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerItem}>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          voluptatem doloremque esse laudantium hic aut quam beatae, rerum quod
          aliquam a tempore odio quas atque autem incidunt nulla voluptatum
          facere!
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const SharedTransition: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  containerItem: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
  },
});

export default SharedTransition;
