import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({
  video: { title, thumbnail, video, username, avatar },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="mb-14">
      <View className="flex-row items-center justify-between w-full mb-5">
        <View className="flex-row items-center space-x-3 w-4/5">
          <View className="h-12 w-12 border border-secondary-100 rounded-lg overflow-hidden">
            <Image
              source={{ uri: avatar }}
              className="h-full w-full rounded-lg"
              resizeMode="contain"
            />
          </View>

          <View>
            <Text className="text-white font-psemibold truncate">{title}</Text>
            <Text className="text-gray-100 font-pregular text-sm">
              {username}
            </Text>
          </View>
        </View>
        <Image source={icons.menu} className="h-5 " resizeMode="contain" />
      </View>

      {/*thumbnail  */}

      {play ? (
        <Video
          source={{
            uri: video,
          }}
          className="h-60 w-full rounded-3xl mt-5"
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
          className="h-60 w-full"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="h-full rounded-xl"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute h-12 w-12 top-[90] left-[140]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
