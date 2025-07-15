import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ThemedText } from "../themedComps/ThemedText";
import { ThemedView } from "../themedComps/ThemedView";
import { WeatherIcon } from "./WeatherIcon";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColor } from "@/hooks/useThemeColor";

// Para animar expansão no Android (ativar LayoutAnimation)
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export type DayWatherProps = {
    day: string;
    weekDay: string;
    isSelected: boolean;
    shouldLoad: boolean;
}

export default function DayWeather({
    day,
    weekDay,
    isSelected,
    shouldLoad,
}: DayWatherProps) {

    const [expanded, setExpanded] = useState(false);

    const detailColor = useThemeColor({}, 'secondaryDetails');
    const chevronColor = useThemeColor({}, 'primaryText')

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(isSelected);
    }, [isSelected]);

    return (
        <View >
            <ThemedView style={{ ...( isSelected ? { borderWidth: 2, borderColor: detailColor } : {} ),
                                 flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: 10, paddingVertical: 4}} >
                <View style={{ justifyContent: 'center' }}>
                <ThemedText>{weekDay}</ThemedText>
                <ThemedText>{day}</ThemedText>
                </View>
                <View style={{ justifyContent: 'center' }}>
                <WeatherIcon size={30} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                <ThemedText>26°/11°</ThemedText>
                </View>
                <View style={{ justifyContent: 'center' }}>
                <ThemedText>11-40</ThemedText>
                <ThemedText>km/h</ThemedText>
                </View>
                <View style={{ justifyContent: 'center' }}>
                {shouldLoad ? (
                    <ActivityIndicator color={chevronColor} />
                ) : (
                    <Icon name={expanded ? "chevron-down" : "chevron-right"} size={30} color={chevronColor} />
                )}
                </View>
            </ThemedView>
            <View>
            {isSelected && expanded && (
                <ThemedView style={{ padding: 12, borderRadius: 10, marginTop: 4 }}>
                {/* Conteúdo extra expandido */}
                <ThemedText>Detalhes extras do clima...</ThemedText>
                <ThemedText>Umidade: 80%</ThemedText>
                <ThemedText>Chance de chuva: 20%</ThemedText>
                {/* Coloque o que quiser aqui */}
                </ThemedView>
            )}
            </View>
        </View>
    );
}
