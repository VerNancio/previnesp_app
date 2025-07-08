import React, { JSX } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Stack } from 'expo-router';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function Layout() {

  const iconColor = useThemeColor({}, 'primaryText');
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{
        // headerShown: false
        }}>
            <Stack.Screen
            name="home"
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen 
            name="(modals)/modalWeatherDetails" 
            options={{
              title: 'Detalhes',
              presentation: 'modal',
            }} 
            />
        </Stack>
    </GestureHandlerRootView>
  );
}


