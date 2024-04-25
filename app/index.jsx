import { Link, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { images } from '../constants';
import { AuthProvider, getUserSession } from '../context/AuthProvider';

export default function App() {
  // checking if the user is logged in
  const { isLoggedIn, isLoading } = getUserSession();
  if (isLoggedIn && !isLoading) return <Redirect href={'/home'} />;
  return (
    <AuthProvider>
      <SafeAreaView className="bg-primary items-center justify-center">
        <ScrollView
          contentContainerStyle={{
            height: '100%',
            marginTop: 20,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[84] w-[130] mx-auto"
          />

          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[380px] h-[298px] w-full mb-10"
          />

          <View>
            <Text className="text-3xl text-center font-psemibold text-gray-100 mb-5">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Text className="text-gray-100 text-[17px] text-center mb-10 ">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>
          </View>

          <TouchableOpacity
            className={
              'bg-secondary-200 w-[300px] px-10 py-5 rounded-lg mx-auto '
            }
            onPress={() => router.push('/sign-in')}
            activeOpacity={0.7}
          >
            <Text className="text-xl font-bold text-center">
              Continue with Email
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </AuthProvider>
  );
}
