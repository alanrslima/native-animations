import React, {useState, useRef} from 'react';
import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
import data from '../data';
import styles from './styles';
import {Transition, Transitioning} from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const AccordionMenu: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(
    undefined as number | undefined,
  );
  const ref = useRef();

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}>
      <StatusBar hidden />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              ref?.current?.animateNextTransition();
              setCurrentIndex(index === currentIndex ? undefined : index);
            }}
            style={styles.cardContainer}
            key={item.category}>
            <View style={[styles.card, {backgroundColor: item.bg}]}>
              <Text style={[styles.heading, {color: item.color}]}>
                {item.category}
              </Text>
              {currentIndex === index && (
                <View style={styles.subCategoriesList}>
                  {item.subCategories.map((subCategory) => (
                    <Text
                      style={[styles.body, {color: item.color}]}
                      key={subCategory}>
                      {subCategory}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
};

export default AccordionMenu;
