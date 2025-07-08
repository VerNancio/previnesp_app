import { Appearance, StyleSheet, TouchableOpacity, View, } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/themedComps/ThemedText';

import ThemedSwitch from '@/components/themedComps/ThemedSwitch';

import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ConfigScreen() {

  const [colorTheme, setColorTheme] = useState(Appearance.getColorScheme());

  const changeColorTheme = () => {
    setColorTheme(colorTheme === 'light' ? 'dark' : 'light')
    Appearance.setColorScheme(colorTheme)
  }

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={{ padding: 1, alignSelf: 'flex-start' }}>
                    <ThemedText>Configs</ThemedText>
                </View>
                <TouchableOpacity>
                    <Icon name="cog" size={100} color="white" />
                </TouchableOpacity>
            </View>
            }
        >
      <View style={{ backgroundColor: 'red' }}>
        <ThemedSwitch onChangeFunction={ changeColorTheme } />
      </View>
    </ParallaxScrollView>
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
