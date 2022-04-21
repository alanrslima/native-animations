import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Toast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);

  const bottom = React.useRef(new Animated.Value(-500)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bottom, {
        toValue: visible ? 32 : -height - 32,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [visible, bottom, opacity, height]);

  return (
    <View style={styles.page}>
      <Animated.View
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        style={[styles.container, {bottom, opacity}]}>
        <View style={styles.wrapperLeft}>
          <Icon name="triangle" color="#ECC14B" size={28} />
        </View>
        <View style={styles.wrapperCenter}>
          <Text style={styles.text}>
            <Text style={styles.bold}>
              Ocorreu um erro ao fazer upload da sua imagem.
            </Text>{' '}
            Por favor, tente novamente mais tarde.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.wrapperRight}>
          <Icon name="x" color="#464F57" size={28} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#e5a',
  },
  container: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    left: 16,
    backgroundColor: '#1C2635',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 5,
    borderColor: '#313B4E',
    borderWidth: 1,
  },
  text: {
    color: '#FFF',
  },
  bold: {
    fontWeight: '600',
  },
  wrapperLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperCenter: {
    flex: 1,
    marginHorizontal: 16,
  },
  wrapperRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Toast;
