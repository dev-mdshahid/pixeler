import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 1,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 1,
  },
};

const TrendingItem = ({ item, activeItem }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className=" mr-5 rounded-xl overflow-hidden  "
      // animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{
            uri: item.video,
          }}
          className="h-72 w-52 rounded-3xl mt-5"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className=" h-72 w-52 rounded-3xl overflow-hidden  shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12 top-32 left-20"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ videos }) => {
  const [activeItem, setActiveItem] = useState(videos[0]);

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return <TrendingItem item={item} activeItem={activeItem} />;
      }}
      horizontal
    />
  );
};

export default Trending;
