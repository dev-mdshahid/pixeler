import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

const CustomButton = ({ text, className, handlePress, isSubmitting }) => {
  return (
    <TouchableOpacity
      className={'bg-secondary-200 w-full px-10 py-4 rounded-lg mx-auto '}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      {isSubmitting ? (
        <ActivityIndicator color={'black'} />
      ) : (
        <Text className="text-xl capitalize font-bold text-center">{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
