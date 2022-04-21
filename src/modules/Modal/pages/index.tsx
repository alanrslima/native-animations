import React, {useState, useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}
const BottomSheet = ({visible, onClose}: Props) => {
  const bottom = React.useRef(new Animated.Value(-500)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  const onPressWrapper = () => {
    Animated.parallel([
      Animated.timing(bottom, {
        toValue: -400,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bottom, {
        toValue: visible ? 0 : -400,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [visible, bottom, opacity]);

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={onPressWrapper}>
        <Animated.View style={[styles.wrapper, {opacity}]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.content, {opacity, bottom}]} />
    </Modal>
  );
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Abrir modal" onPress={() => setVisible(true)} />
      <BottomSheet onClose={() => setVisible(false)} visible={visible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    position: 'absolute',
    bottom: -300,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 30,
    height: 300,
    overflow: 'hidden',
    margin: 16,
  },
});

export default App;
