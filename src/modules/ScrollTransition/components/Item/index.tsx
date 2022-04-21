import React from 'react';
import {View, Image, Text} from 'react-native';

import styles from './styles';

const Item = ({profile, title, subTitle, description}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: profile}} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default Item;
