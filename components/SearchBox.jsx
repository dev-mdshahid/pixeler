import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '../constants';

const SearchBox = ({ value, handleChangeText, placeholder, secure }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="gap-3 mb-5">
      <View className="flex-row justify-between items-center rounded-xl h-16 bg-black-100 border-2 border-primary focus:border-secondary-200 px-5">
        <TextInput
          className="text-base font-psemibold text-white h-full flex-grow"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          secureTextEntry={secure && !showPassword}
        />

        <TouchableOpacity>
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBox;
