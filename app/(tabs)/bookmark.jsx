import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Bookmark = () => {
  return (
    <SafeAreaView className="h-full bg-primary p-5">
      <Text className="text-white text-center mt-16 text-xl">
        No bookmark has been found!
      </Text>
    </SafeAreaView>
  );
};

export default Bookmark;
