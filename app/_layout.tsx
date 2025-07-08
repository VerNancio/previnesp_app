import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { enableScreens } from 'react-native-screens';
enableScreens(); // Ativa otimizações e gestos


// import { Audio } from 'expo-av';

import { ThemedView } from '@/components/themedComps/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ActivityIndicator } from 'react-native';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loadingColor = useThemeColor({}, 'primaryDetails');

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' color='blue' />
        </ThemedView>
      
    );
  }

  return (
    <>
      <StatusBar hidden={true}/>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
