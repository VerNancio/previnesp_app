import ModalGesture from '@/components/ModalGesture';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


export default function ModalWeatherDetails() {


  const { day } = useLocalSearchParams();
  
  return (
    <View style={{ flex: 1 }}>
      <ModalGesture><Text>{day}</Text></ModalGesture>
    </View>
    
  );
}
