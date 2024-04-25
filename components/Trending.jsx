import { View, Text, FlatList } from 'react-native';
import React from 'react';

const Trending = () => {
  return (
    <FlatList
      data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View>
            <Text className="text-white">{item.id}</Text>
          </View>
        );
      }}
      horizontal
    />
  );
};

export default Trending;