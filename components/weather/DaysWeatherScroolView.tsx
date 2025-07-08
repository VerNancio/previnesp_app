import { ScrollViewProps, TouchableOpacity } from 'react-native';
import { ThemedText } from '../themedComps/ThemedText';
import { ThemedView } from '../themedComps/ThemedView';
import { ThemedScrollView } from '../themedComps/ThemedScrollView';

import DayWeather from './DayWeather';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { useRouter } from 'expo-router';


// export type DaysWeatherScroolViewProps = {
//     sendTo: string;
// }

export default function DaysWeatherScroolView() {

    const router = useRouter();


    const bgColor = useThemeColor({}, 'secondaryBg');
    const detailColor = useThemeColor({}, 'primaryDetails');


    const weekDays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
    const months =['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    const hoje = new Date();

    // Lista com os próximos 15 dias: "27 DE MAI", etc.
    const dateList: string[] = [];

    // Lista com os próximos 7 dias: "HOJE", "AMANHÃ", "QUARTA"...
    const dayList: string[] = [];


    for (let i = 0; i < 15; i++) {
        const date = new Date();
        date.setDate(hoje.getDate() + i);
        
        const day = date.getDate();
        const month = months[date.getMonth()]

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
        
        dateList.push(`${day} DE ${month}`)
    }


    const [indexPressed, setIndexPressed] = useState<Number | null>(null);
    const [shouldLoad, setWhichShouldLoad] = useState<Number | null>(null);


    const handlePress = function (index: number, day: string) {
        if (indexPressed === index) {
            setIndexPressed(null);
            return;
        }

        setIndexPressed(index);
        // useRouter().push(`/(drawer)/(tabs)/(stack)/modalWeatherDetails?day=${day}` as any);
    };

    const handleLongPress = function (index: number, day: string) {

        setIndexPressed(index);
        setWhichShouldLoad(index);

        setTimeout(() => setWhichShouldLoad(null), 2600);

        useRouter().push(`/(drawer)/(tabs)/(stack)/modalWeatherDetails?day=${day}` as any);
    };


    return (
        <ThemedView style={{ width: '100%' }}>
            <ThemedText type="subtitle">Temperatura ao longo do dia:</ThemedText>
            <ThemedScrollView style={{ flex: 1, borderRadius: 10, marginVertical: 10, paddingVertical: 14 }} showsHorizontalScrollIndicator={false}>
                {dateList.map((day, index) => (
                    <TouchableOpacity 
                    onPress={ () => handlePress(index, day) } 
                    onLongPress={ () => handleLongPress(index, day)}
                    key={index}
                    style={{...(index == indexPressed ? { paddingVertical: 3, paddingHorizontal: 10 } : { paddingVertical: 5, paddingHorizontal: 12 }) }}>
                        <DayWeather day={day} weekDay={dayList[index]} thisShouldLoad={index == shouldLoad}
                        styles={{ borderColor: detailColor, 
                            ...( index == indexPressed ? {borderWidth: 2} : {})
                        }}/>
                    </TouchableOpacity>
                ))}
            </ThemedScrollView>
        </ThemedView>
    );
}
