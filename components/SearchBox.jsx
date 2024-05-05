import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchBox = ({ placeholder, initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="gap-3 mb-5">
      <View className="flex-row justify-between items-center rounded-xl h-16 bg-black-100 border-2 border-primary focus:border-secondary-200 px-5">
        <TextInput
          className="text-base font-psemibold text-white h-full flex-grow"
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
        />

        <TouchableOpacity
          onPress={() => {
            if (!query) {
              Alert.alert(
                'No search text found',
                'Please type something to search'
              );
            } else {
              if (pathname.startsWith('search')) {
                router.replace(`search/${query}`);
              }
              router.push(`search/${query}`);
            }
          }}
        >
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
