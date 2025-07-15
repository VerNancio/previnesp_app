import { ActivityIndicator, TouchableOpacity } from 'react-native';
import WeatherByHorary from './WeatherByHorary';

import { ThemedText } from '../themedComps/ThemedText';
import { ThemedView } from '../themedComps/ThemedView';
import { ThemedScrollView } from '../themedComps/ThemedScrollView';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { Background } from '@react-navigation/elements';
import tinycolor from 'tinycolor2';



export default function WeatherByHorarysScroolView() {


    const bgColor = useThemeColor({}, 'secondaryBg');
    const detailColor = useThemeColor({}, 'secondaryDetails');
    const bgColorCurrHour = tinycolor(bgColor).lighten(4).toString(); 



    const [currentHour, setCurrentHour] = useState(new Date().toLocaleTimeString());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().toLocaleTimeString([], {hour: '2-digit'}));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    

    const hours: string[] = [];

    for (let i = 0; i < 24; i++) {
        const hora = String(i).padStart(2, '0') + ':00';
        hours.push(hora);
    }


    const [indexPressed, setIndexPressed] = useState<Number | null>(null);
    
    const handlePress = function (index: number) {
        if (indexPressed === index) {
            setIndexPressed(null);
            return;
        }

        setIndexPressed(index);
    };

    return (
        <ThemedView>
            <ThemedText type="subtitle">Temperatura ao longo do dia:</ThemedText>
                <ThemedText type='default'>Clima nublado nas próximas horas</ThemedText>
                <ThemedScrollView style={{ flex: 1, borderRadius: 30, marginVertical: 10 }} 
                            horizontal showsHorizontalScrollIndicator={false}>           
                    {hours.map((hour, index) => (
                        <TouchableOpacity 
                            onPress={ () => handlePress(index) }
                            key={index} 
                            style={{ 
                            ...(index == indexPressed ? 
                                { 
                                    paddingVertical: 6, marginHorizontal: 0 
                                } : { 
                                    paddingVertical: 8 
                                }),
                            marginLeft: index == 0 ? 10 : 0,
                            marginRight: index == hours.length - 1 ? 10 : 0
                            }}>
                            <WeatherByHorary 
                            hour={hour}
                            size={16}
                            styles={{
                                borderWidth: index == indexPressed ? 2 : 0, 
                                borderColor: detailColor,
                                borderRadius: 50,
                                backgroundColor: hour.startsWith(currentHour) ? bgColorCurrHour : ''
                            }}
                            />
                        </TouchableOpacity>
                    ))}
                </ThemedScrollView>
        </ThemedView>
    );
}
