import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/themedComps/ThemedText';
import { ThemedView } from '@/components/themedComps/ThemedView';
// import { IconSymbol } from '@/components/ui/IconSymbol';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import AverageTempView from '@/components/dataAnalysis/AverageWeatherView';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function TabTwoScreen() {

  const iconColor = useThemeColor({}, 'primaryText');
  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>

          <Icon
          name="google-analytics" 
          size={120} 
          color='white'
          style={{ position: 'absolute' }}
          />
          </TouchableOpacity>
        // <IconSymbol
        //   size={310}
        //   color="#808080"
        //   name="chevron.left.forwardslash.chevron.right"
        //   style={styles.headerImage}
        // />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Mais Informações</ThemedText>
      </ThemedView>
      <ThemedView>
        <AverageTempView />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
