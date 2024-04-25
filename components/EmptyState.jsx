import { View, Text, Image } from 'react-native';
import React from 'react';

import { images } from '../constants';
import CustomButton from './CustomButton';

const EmptyState = () => {
  return (
    <View className="items-center p-5">
      <Image source={images.empty} className="w-[200px] h-[200px]" />
      <View className="items-center space-y-1 mb-5">
        <Text className="font-pmedium text-xl text-white">
          No Vidoes Found!
        </Text>
        <Text className="font-pregular text-gray-100">
          Be the first one to upload a video
        </Text>
      </View>
      <CustomButton text={'Create video'} />
    </View>
  );
};

export default EmptyState;
