import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ThemedParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/themedComps/ThemedView';

import Degree from '@/components/Degree';
import DaysWeatherScroolView from '@/components/weather/DaysWeatherScroolView';
import WeatherByHorarysScroolView from '@/components/weather/WeatherByHorarysScroolView';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import SelectNeighborhoodView from '@/components/neighborhood/SelectNeighborhoodView';


export default function HomeScreen() {

  return (
    <ThemedParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <View style={{ padding: 1, alignSelf: 'flex-start' }}>
              <Degree degree={17} fontSize={75} type='custom' />
            </View>
            <TouchableOpacity>
              <WeatherIcon size={70} color='white' />
            </TouchableOpacity>
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <SelectNeighborhoodView />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <WeatherByHorarysScroolView />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <DaysWeatherScroolView />
      </ThemedView>
    </ThemedParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
