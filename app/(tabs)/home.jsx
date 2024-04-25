import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchBox from '../../components/SearchBox';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/hooks/useAppwrite';

// Never make a component in React native async as they all are client components
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllPosts();
        setData(response);
      } catch (error) {
        Alert.alert('Error while loading data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // refresh code

    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return (
            <View>
              <Text className="text-white">{item.title}</Text>
            </View>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View className="p-5">
              {/* Top heading + logo */}
              <View className="flex-row justify-between items-center mb-5">
                {/* Heading */}
                <View className="gap-2">
                  <Text className="text-gray-100 font-pregular">
                    Welcome Back
                  </Text>
                  <Text className="font-psemibold text-white text-3xl">
                    Shahid
                  </Text>
                </View>

                {/* Logo */}
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>

              {/* search box */}
              <SearchBox placeholder={'Search for a video topic'} />

              {/* Horizontal trending list */}
              <Trending />
            </View>
          );
        }}
        ListEmptyComponent={() => <EmptyState />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
