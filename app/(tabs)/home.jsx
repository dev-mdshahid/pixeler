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
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/hooks/useAppwrite';
import VideoCard from '../../components/VideoCard';

// Never make a component in React native async as they all are client components
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response1 = await getAllPosts();
        setData(response1);

        const response2 = await getLatestPosts();
        setLatestPosts(response2);
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
    setIsLoading(true);
    try {
      const response1 = await getAllPosts();
      setData(response1);

      const response2 = await getLatestPosts();
      setLatestPosts(response2);
    } catch (error) {
      Alert.alert('Error while loading data', error);
    } finally {
      setIsLoading(false);
    }

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
              <Text className="text-lg text-white font-psemibold mb-5">
                Latest Videos
              </Text>
              <Trending videos={latestPosts} />
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
