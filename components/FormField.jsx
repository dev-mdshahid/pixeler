import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const FormField = ({ title, value, handleChangeText, placeholder, secure }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="gap-3 mb-5">
      <Text className="text-gray-100 font-pmedium text-base">{title}</Text>
      <View className="flex-row justify-between items-center rounded-xl h-16 bg-black-100 border-2 border-primary focus:border-secondary-200 px-5">
        <TextInput
          className="text-base font-psemibold text-white h-full flex-grow"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          secureTextEntry={secure && !showPassword}
        />

        {secure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
