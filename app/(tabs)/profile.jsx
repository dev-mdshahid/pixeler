import {
  View,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  getAllPosts,
  getSearchedPosts,
  getUnApprovedPosts,
  getUserPosts,
  signOut,
} from '../../lib/appwrite';
import SearchBox from '../../components/SearchBox';
import EmptyState from '../../components/EmptyState';
import { icons, images } from '../../constants';
import VideoCard from '../../components/VideoCard';
import { getUserSession } from '../../context/AuthProvider';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = getUserSession();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (user.email.toLowerCase() !== 'admin@mail.com') {
          const response = await getUserPosts(user.accountId);
          setData(response);
        } else {
          const response = await getUnApprovedPosts();
          setData(response);
        }
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
      if (user.email.toLowerCase() !== 'admin@mail.com') {
        const response = await getUserPosts(user.accountId);
        setData(response);
      } else {
        const response = await getUnApprovedPosts();
        setData(response);
      }
    } catch (error) {
      Alert.alert('Error while loading data', error);
    } finally {
      setIsLoading(false);
    }

    setRefreshing(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/sign-in');
  };
  return (
    <SafeAreaView className="bg-primary h-full p-5">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return (
            <VideoCard
              video={item}
              approve={user.email.toLowerCase() === 'admin@mail.com'}
            />
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View>
              <TouchableOpacity className="items-end" onPress={handleLogout}>
                <Image source={icons.logout} className="w-6 h-6" />
              </TouchableOpacity>
              <View className="mb-10 items-center mt-5">
                <View className="h-16 w-16 mb-5 border border-secondary-100 rounded-lg overflow-hidden">
                  <Image
                    source={{ uri: user.avatar }}
                    className="h-full w-full rounded-lg"
                    resizeMode="contain"
                  />
                </View>
                <View>
                  <Text className="text-white text-3xl font-psemibold mb-6">
                    {user.username}
                  </Text>
                </View>

                <View className="flex-row gap-12">
                  {user.email.toLowerCase() === 'admin@mail.com' ? (
                    <View className="items-center">
                      <Text className="text-3xl font-pmedium text-white">
                        Approve Panel
                      </Text>
                      <Text className="font-pregular text-white">
                        User Role
                      </Text>
                    </View>
                  ) : (
                    <>
                      <View className="items-center">
                        <Text className="text-3xl font-pmedium text-white">
                          10
                        </Text>
                        <Text className="font-pregular text-white">Posts</Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-3xl font-pmedium text-white">
                          1.2k
                        </Text>
                        <Text className="font-pregular text-white">Views</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
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

export default Profile;
