import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from './themedComps/ThemedText';

const hours = Array.from({ length: 24 }, (_, i) => i); // 0h a 23h

export default function HourRangeSelector() {
  const [startHour, setStartHour] = useState<number | null>(null);
  const [endHour, setEndHour] = useState<number | null>(null);

  const toggleHour = (hour: number) => {
    if (startHour === null || (startHour !== null && endHour !== null)) {
      setStartHour(hour);
      setEndHour(null);
    } else if (hour < startHour) {
      setStartHour(hour);
      setEndHour(null);
    } else if (hour === startHour) {
      setStartHour(null);
      setEndHour(null);
    } else {
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
    <View style={{ padding: 20 }}>
      <ThemedText style={{ marginBottom: 10 }}>
        {startHour !== null && endHour !== null
          ? `Selecionado: ${startHour}h às ${endHour}h`
          : startHour !== null
          ? `Selecionado: ${startHour}h`
          : 'Toque para selecionar horário'}
      </ThemedText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.lineContainer}>
          {/* Linha base cinza */}
          <View style={styles.fullLine} />

          {/* Linha azul de seleção */}
          {startHour !== null && (
            <View
              style={[
                styles.selectedLine,
                {
                  left: startHour * 40,
                  width: ((endHour ?? startHour + 0.01) - startHour) * 40,
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
                styles.hourDot,
                { left: hour * 40 - 6 },
              ]}
            >
                <TouchableOpacity style={isSelected(hour) && styles.selectedDot}>
                    <Text style={styles.hourText}>{hour}h</Text>
                </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  lineContainer: {
    height: 40,
    paddingVertical: 30,
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 6,
    width: 24 * 40,
  },
  fullLine: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#ddd',
    top: 18,
    borderRadius: 2,
  },
  selectedLine: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#007AFF',
    top: 18,
    borderRadius: 2,
  },
  hourDot: {
    paddingVertical: 30,
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
    right: 5,
    borderRadius: 8,
    top: 11,
  },
  hourText: {
    fontSize: 12,
    marginTop: 22,
    color: '#333',
  },
});
