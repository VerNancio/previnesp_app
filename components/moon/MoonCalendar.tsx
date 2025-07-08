import { TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { ThemedText } from '../themedComps/ThemedText';
import { ThemedView } from '../themedComps/ThemedView';


export default function MoonCalendar() {

    const bgColor = useThemeColor({}, 'secondaryBg');
    const detailColor = useThemeColor({}, 'primaryDetails');


    const weekDays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    const hoje = new Date();

    // Lista com os próximos 15 dias: "27 DE MAI", etc.
    const dateList: string[] = [];

    // Lista com os próximos 7 dias: "HOJE", "AMANHÃ", "QUARTA"...
    const dayList: string[] = [];


    for (let i = 0; i < 15; i++) {
        const date = new Date();
        date.setDate(hoje.getDate() + i);
        
        const day = date.getDate();
        const month = months[date.getMonth()];

        if (i === 0) {
            dayList.push('HOJE');
        } else if (i === 1) {
            dayList.push('AMANHÃ');
        } else {
            const date = new Date();
            date.setDate(hoje.getDate() + i);
            
            const weekDay = weekDays[date.getDay()];
            dayList.push(weekDay);
        }
        
        dateList.push(`${day} DE ${month}`);
    }


    const [indexPressed, setIndexPressed] = useState<Number | null>(null);

    const handlePress = function (index: number) {
        setIndexPressed(index);
    };


    return (
        <ThemedView style={{ width: '100%' }}>
            <ThemedText type="subtitle">Calendário lunar nos próximos 15 dias:</ThemedText>
            <View style={{ flex: 1, borderRadius: 10, backgroundColor: bgColor, marginVertical: 10, paddingVertical: 14 }} >
                <View>
                    {dateList.map((day) => (
                        <ThemedText>{day}</ThemedText>
                    ))}
                </View>
                <View>
                    {dateList.map((day, index) => (
                    <TouchableOpacity 
                        onPress={ () => handlePress(index) } 
                        key={index}
                        style={{ paddingVertical: 5, paddingHorizontal: 12 }}>
                        {/* <DayWeather day={day}  weekDay={dayList[index]}
                        styles={{ borderWidth: index == indexPressed ? 2 : 0, borderColor: detailColor }}
                        /> */}
                    </TouchableOpacity>
                ))}
                </View>
            </View>
        </ThemedView>
    );
}
