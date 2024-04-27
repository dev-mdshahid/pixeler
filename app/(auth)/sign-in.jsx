import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';

import { images } from '../../constants';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser, signIn } from '../../lib/appwrite';
import { getUserSession } from '../../context/AuthProvider';

const SignIn = () => {
  const { setUser } = getUserSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Please fill in all the fields!');
    } else {
      setIsSubmitting(true);
      try {
        const response = await signIn(formData.email, formData.password);
        router.replace('/home');
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        throw new Error(error);
      }
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
            Sign In
          </Text>
        </View>

        <View className="">
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
            text={'Login'}
            handlePress={handleSignIn}
            isSubmitting={isSubmitting}
          />
        </View>

        <View className="mt-5">
          <Text className="text-gray-100 text-base font-pmedium text-center">
            Don't have an account?{' '}
            <Link href={'/sign-up'} className="text-secondary-200">
              Sign up!
            </Link>
          </Text>
        </View>

        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
