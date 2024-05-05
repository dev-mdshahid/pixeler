import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { ResizeMode, Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { createVideoPost, getCurrentUser } from '../../lib/appwrite';
import { getUserSession } from '../../context/AuthProvider';
import { router } from 'expo-router';

const Create = () => {
  const { user } = getUserSession();
  console.log(user.accountId);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    video: '',
    thumbnail: '',
    prompt: '',
  });

  const openPicker = async (fileType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        fileType === 'image'
          ? ['image/png', 'image/jpg', 'image/jpeg']
          : ['video/mp4', 'video/gif'],
    });

    if (!result.canceled) {
      if (fileType === 'image') {
        setFormData({ ...formData, thumbnail: result.assets[0] });
      } else if (fileType === 'video') {
        setFormData({ ...formData, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (formData.prompt === '') |
      (formData.title === '') |
      !formData.thumbnail |
      !formData.video
    ) {
      return Alert.alert('Please provide all fields');
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...formData,
        creator: user.accountId,
        username: user.username,
        avatar: user.avatar,
      });

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    } finally {
      setFormData({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary p-5">
      <ScrollView>
        <View>
          <Text className="text-3xl font-pbold text-white pb-10">
            Upload Video
          </Text>
        </View>
        <View>
          <FormField
            placeholder={'Give your video a catchy title...'}
            title={'Video Title'}
            value={formData.title}
            handleChangeText={(e) => setFormData({ ...formData, title: e })}
          />

          {/* upload video */}
          <Text className="text-gray-100 font-pmedium text-base mb-2">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {formData.video ? (
              <Video
                source={{ uri: formData.video.uri }}
                className="h-64 w-full rounded-xl"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                isLooping
              />
            ) : (
              <View className="mb-5">
                <View className="h-48 bg-black-100 rounded-xl justify-center items-center">
                  <View className="border border-dashed border-secondary-100/50 h-16 w-16 rounded-lg justify-center items-center">
                    <Image
                      source={icons.upload}
                      className="h-1/2 w-1/2"
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* upload image */}
          <Text className="text-gray-100 font-pmedium text-base mb-2 mt-5">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {formData.thumbnail ? (
              <Image
                source={{ uri: formData.thumbnail.uri }}
                resizeMode="contain"
                className="h-64 rounded-xl"
              />
            ) : (
              <View className="mb-5">
                <View className="h-16 bg-black-100 rounded-xl flex-row  justify-center items-center">
                  <View className=" h-8 w-8 mr-3 justify-center items-center">
                    <Image
                      source={icons.upload}
                      className="h-full w-full"
                      resizeMode="contain"
                    />
                  </View>

                  <Text className="text-white font-psemibold text-lg">
                    Choose a file
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          <FormField
            placeholder={'The AI prompt of your video...'}
            title={'AI Prompt'}
            value={formData.prompt}
            handleChangeText={(e) => setFormData({ ...formData, prompt: e })}
          />

          <CustomButton
            text={'Submit & Publish'}
            isSubmitting={uploading}
            handlePress={submit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
