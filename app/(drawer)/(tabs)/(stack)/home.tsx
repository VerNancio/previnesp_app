import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ThemedParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/themedComps/ThemedView';

import Degree from '@/components/Degree';
import DaysWeatherScroolView from '@/components/weather/DaysWeatherScroolView';
import WeatherByHorarysScroolView from '@/components/weather/WeatherByHorarysScroolView';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import SelectDistrictView from '@/components/district/SelectDistrictView';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import District from '@/services/district/District';
import { ThemedText } from '@/components/themedComps/ThemedText';


export default function HomeScreen() {

  const districtService = new District();
  
  const [districtName, setDistrictName] = useState<string | null>(null)
  const [currentHorary, setCurrentHorary] = useState(new Date().toLocaleTimeString());

  const loadDistrictName = async () => {
      let name: string | null = await districtService.getDistrictName() ?? null;

      if (name) {
          setDistrictName(name);
      }
  };

  useFocusEffect(
      useCallback(() => {
      loadDistrictName(); 
      }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHorary(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <ThemedParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity>
                <Degree degree={17} fontSize={70} type='custom' />
              </TouchableOpacity>
              <TouchableOpacity>
                <WeatherIcon size={70} color='white' />
              </TouchableOpacity>
            </View>
            {/* </View style={{ padding: 1, alignSelf: 'flex-start' }}> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <ThemedText type='subtitle' style={{ color: 'white' }}>{districtName}</ThemedText>
                <ThemedText type='defaultSemiBold' style={{ color: 'white' }}>{currentHorary}</ThemedText>
              </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View>
                <ThemedText type='subtitle' style={{ color: 'white' }}>hum: 70%</ThemedText>
              </View>
              <ThemedText type='defaultSemiBold' style={{ color: 'white' }}>Tempo agradavel</ThemedText>
            </View>
            </View>
          </View>
          <View>
           
          </View>
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <SelectDistrictView />
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
