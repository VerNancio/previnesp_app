import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themedComps/ThemedText';


const numberOfDays = 15;

export default function DayRangeSelector() {

  const lineColor = useThemeColor({}, 'primaryDetails');
  const selectedColor = useThemeColor({}, 'secondaryDetails');

  const textColor = useThemeColor({}, 'primaryText')


  
  

  const [startDay, setStartDay] = useState<number | null>(null);
  const [startDayIndex, setStartDayIndex] = useState<number | null>(null);

  const [endDay, setEndDay] = useState<number | null>(null);
  const [endDayIndex, setEndDayIndex] = useState<number | null>(null);



  // const weekDays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
  const months =['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const hoje = new Date();

  // Lista com os próximos 15 dias: "27 DE MAI", etc.
  const dateList: string[] = [];

  // Lista com os próximos 7 dias: "HOJE", "AMANHÃ", "QUARTA"...
  const dayList: string[] = [];


  for (let i = 0; i < numberOfDays; i++) {
      const date = new Date();
      date.setDate(hoje.getDate() + i);
      
      const day = date.getDate();
      const month = months[date.getMonth()]

      // date.setDate(hoje.getDate() + i);
          
      //     // const weekDay = weekDays[date.getDay()];
      //     // dayList.push(weekDay);
      // }
      
      dateList.push(`${day}/${month}`)
  }

  

  const toggleDay = (day: string, index: number) => {

    // Se os dois estiverem desativados
    if (startDayIndex === null && endDayIndex === null) {
      setStartDayIndex(index);
      setStartDay(day);
    }
    else if (index === startDayIndex && endDayIndex === null) {
      setStartDayIndex(null);
      setStartDay(null);
    }
    // Se os dois estão ativos
    else if (startDayIndex !== null && endDayIndex !== null) {
      // alert('c')

      if (index < startDayIndex) {
        setStartDayIndex(index);
        setStartDay(day);
      } 
      else if (index > endDayIndex) {
        setEndDayIndex(index);
        setEndDay(day);
      }

      // Se hora for igual a algum
      else if (index === startDayIndex || index === endDayIndex) {

        
        if (index === startDayIndex) {
          setStartDayIndex(endDayIndex);
          setStartDay(endDay);

          setEndDayIndex(null);
          setEndDay(null);
        } 
        else if (index === endDayIndex) {
          setEndDayIndex(null);
          setEndDay(null);
        }

      } 
      
      // Se hora estiver no meio dos dois
      else if (startDayIndex < index && index < endDayIndex) {
        setEndDayIndex(index);
        setEndDay(day);
      }

    }
    else if (index < startDayIndex && endDayIndex === null) {
      setEndDayIndex(startDayIndex);
      setEndDay(startDay);

      setStartDayIndex(index);
      setStartDay(day);
    }
    else if (index > startDayIndex && endDayIndex === null) {
      setEndDayIndex(index);
      setEndDay(day);
    }
    else if (index < endDayIndex) {
      setEndDayIndex(index);
      setEndDay(day);
    } 
    
  };

  const isSelected = (index: number) => {
    if (startDayIndex !== null && endDayIndex !== null) {
      return index >= startDayIndex && index <= endDayIndex;
    }
    return index === startDayIndex;
  };

  
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <ThemedText style={{ marginBottom: 2 }}>
        {startDayIndex !== null && endDayIndex !== null
          ? `Selecionado: ${startDay} ao dia ${endDay}`
          : startDayIndex !== null
          ? `Selecionado: ${startDay}`
          : 'Toque para selecionar os dias:'}
      </ThemedText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.lineContainer}>

          {/* Linha base cinza */}
          <View style={[styles.fullLine, { backgroundColor: lineColor }]} />

          {/* Linha azul de seleção */}
          {startDayIndex !== null && (
            <View
              style={[
                styles.selectedLine,
                {
                  left: startDayIndex * 40,
                  width: ((endDayIndex ?? startDayIndex + 0.01) - startDayIndex) * 40,
                  backgroundColor: selectedColor
                },
              ]}
            />
          )}

          {/* Pontos por hora */}
          {dateList.map((day: string, index: number) => (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day, index)}
              style={[
                styles.dayDot,
                { left: index * 40 - 10 },
              ]}
            >
                <View style={isSelected(index) && [styles.selectedDot, { backgroundColor: selectedColor }]} />
                <Text style={[styles.dayText, { color: textColor }]}>{day}</Text>

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
  width: 15 * 40,
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
