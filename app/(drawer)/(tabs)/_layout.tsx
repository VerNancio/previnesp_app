import { Tabs, Navigator } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function TabLayout() {

  const colorScheme = useColorScheme();


  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center' }}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
        <Tabs.Screen
        name="(stack)"
        options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Icon size={28} name="home" color={color} />,
        }}
        />
        <Tabs.Screen
          name="moreInfo"
          options={{
            title: 'Informações',
            tabBarIcon: ({ color }) => <Icon size={28} name="weather-partly-cloudy" color={color} />,
          }}
        />
    </Tabs>
    </GestureHandlerRootView>
  );
}
