import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList, Image} from 'react-native';

import styles from './styles';

const API_KEY = '563492ad6f91700001000001cd296d6c67fe43f39a0e1d51d98a741f';
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';

const fetchImagesFromPexels = async () => {
  const data = await fetch(API_URL, {headers: {Authorization: API_KEY}});
  const result = await data.json();
  return result.photos;
};

const Main: React.FC = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetchImagesFromPexels();
      setImages(response);
    };

    fetchImages();
  }, []);

  if (!images) {
    return <ActivityIndicator />;
  }

  console.log(images);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{uri: item.src.portrait}} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Main;
