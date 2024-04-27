import {
  View,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { getSearchedPosts } from '../../lib/appwrite';
import SearchBox from '../../components/SearchBox';
import EmptyState from '../../components/EmptyState';
import { images } from '../../constants';
import VideoCard from '../../components/VideoCard';

const Search = () => {
  const { query } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getSearchedPosts(query);
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
    <SafeAreaView className="bg-primary h-full p-5">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="mb-10">
              {/* Top heading + logo */}
              <View className="flex-row justify-between items-center mb-5">
                {/* Heading */}
                <View className="gap-2">
                  <Text className="text-gray-100 font-pregular">
                    Showing Results for
                  </Text>
                  <Text className="font-psemibold text-white text-3xl">
                    {query}
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
              <SearchBox
                placeholder={'Search for a video topic'}
                initialQuery={query}
              />
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

export default Search;
