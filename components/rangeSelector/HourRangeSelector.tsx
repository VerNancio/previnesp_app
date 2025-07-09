import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themedComps/ThemedText';

const hours = Array.from({ length: 24 }, (_, i) => i); // 0h a 23h

export default function HourRangeSelector() {

  const lineColor = useThemeColor({}, 'primaryDetails');
  const selectedColor = useThemeColor({}, 'secondaryDetails');

  const textColor = useThemeColor({}, 'primaryText')
  

  const [startHour, setStartHour] = useState<number | null>(null);
  const [endHour, setEndHour] = useState<number | null>(null);

  const toggleHour = (hour: number) => {

    // Se os dois estiverem desativados
    if (startHour === null && endHour === null) {
      setStartHour(hour);
    }
    else if (hour === startHour && endHour === null) {
      setStartHour(null);
    }
    // Se os dois estão ativos
    else if (startHour !== null && endHour !== null) {
      // alert('c')

      if (hour < startHour) {
        setStartHour(hour);
      } 
      else if (hour > endHour) {
        setEndHour(hour);
      }

      // Se hora for igual a algum
      else if (hour === startHour || hour === endHour) {

        if (hour === startHour) {
          setStartHour(endHour);
          setEndHour(null);
        } 
        else if (hour === endHour) {
          setEndHour(null);
        }

      } 
      
      // Se hora estiver no meio dos dois
      else if (startHour < hour && hour < endHour) {
        setEndHour(hour);
      }

    }
    else if (hour < startHour && endHour === null) {
      setEndHour(startHour);
      setStartHour(hour);
    }
    else if (hour > startHour && endHour === null) {
      setEndHour(hour);
    }
    else if (hour < endHour) {
      setEndHour(hour);
    }

  };


  const isSelected = (hour: number) => {
    if (startHour !== null && endHour !== null) {
      return hour >= startHour && hour <= endHour;
    }
    return hour === startHour;
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <ThemedText style={{ marginBottom: 4 }}>
        {startHour !== null && endHour !== null
          ? `Selecionado: ${startHour}h às ${endHour}h`
          : startHour !== null
          ? `Selecionado: ${startHour}h`
          : 'Toque para selecionar horário: '}
      </ThemedText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.lineContainer}>

          {/* Linha base cinza */}
          <View style={[styles.fullLine, { backgroundColor: lineColor }]} />

          {/* Linha azul de seleção */}
          {startHour !== null && (
            <View
              style={[
                styles.selectedLine,
                {
                  left: startHour * 40,
                  width: ((endHour ?? startHour + 0.01) - startHour) * 40,
                  backgroundColor: selectedColor
                },
              ]}
            />
          )}

          {/* Pontos por hora */}
          {hours.map((hour) => (
            <TouchableOpacity
              key={hour}
              onPress={() => toggleHour(hour)}
              style={[
                styles.dayDot,
                { left: hour * 40 - 6 },
              ]}
            >
                <View style={isSelected(hour) && [styles.selectedDot, { backgroundColor: selectedColor }]} />
                <Text style={[styles.dayText, { color: textColor }]}>{hour}h</Text>

            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  lineContainer: {
  height: 60, 
  position: 'relative',
  justifyContent: 'center',
  width: 24 * 40,
  } ,
  fullLine: {
  position: 'absolute',
  height: 4,
  backgroundColor: 'red', // (apenas pra testar visualmente)
  top: 18,
  left: 0,                // <<< ESSENCIAL
  right: 0,               // <<< ESSENCIAL
  borderRadius: 2,
  },
  selectedLine: {
    position: 'absolute',
    height: 4,
    marginLeft: 20,
    backgroundColor: '#007AFF',
    top: 18,
    borderRadius: 2,
  },
  dayDot: {
    paddingVertical: 3,
    // backgroundColor: 'red',
    paddingHorizontal: 20,
    // backgroundColor: 'red',
    position: 'absolute',
    alignItems: 'center',
  },
  selectedDot: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    width: 18,
    height: 18,
    borderRadius: 8,
    // top: 11,
  },
  dayText: {
    // position: 'absolute',
    fontSize: 12,
    marginTop: 18,
    // color: '#333',
  },
});
