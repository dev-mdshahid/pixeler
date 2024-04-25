import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';

import { images } from '../../constants';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      Alert.alert('Please fill in all the fields!');
    } else {
      setIsSubmitting(true);
      try {
        const response = await createUser(
          formData.email,
          formData.password,
          formData.username
        );
        router.replace('/home');
        console.log(response);
      } catch (error) {
        throw new Error(error);
      }
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full p-5">
      <ScrollView className="my-8">
        <Image
          source={images.logo}
          className="h-[35] w-[115]"
          resizeMode="contain"
        />

        <View>
          <Text className="text-white text-2xl my-8 font-psemibold">
            Create your account
          </Text>
        </View>

        <View className="">
          <FormField
            title={'Username'}
            value={formData.username}
            handleChangeText={(e) => setFormData({ ...formData, username: e })}
          />
          <FormField
            title={'Email'}
            value={formData.email}
            handleChangeText={(e) => setFormData({ ...formData, email: e })}
          />
          <FormField
            title={'Password'}
            secure
            value={formData.password}
            handleChangeText={(e) => setFormData({ ...formData, password: e })}
          />
        </View>

        <View className="mt-5">
          <CustomButton
            text={'Create account'}
            handlePress={handleSignup}
            isSubmitting={isSubmitting}
          />
        </View>

        <View className="mt-5">
          <Text className="text-gray-100 text-base font-pmedium text-center">
            Already have an account?{' '}
            <Link href={'/sign-in'} className="text-secondary-200">
              Login!
            </Link>
          </Text>
        </View>

        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
