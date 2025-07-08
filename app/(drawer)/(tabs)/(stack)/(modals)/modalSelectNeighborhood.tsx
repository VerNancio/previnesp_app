import ModalGesture from '@/components/ModalGesture';
import { ThemedText } from '@/components/themedComps/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Dimensions, Text } from 'react-native';


export default function ModalSelectNeighborhood() {

  
  return (
    <View style={{ flex: 1 }}>
      <ModalGesture><Text>Selecione o bairro: </Text></ModalGesture>
    </View>
    
  );
}
