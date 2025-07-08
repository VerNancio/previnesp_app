import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "../themedComps/ThemedText";
import { ThemedView } from "../themedComps/ThemedView";
import { WeatherIcon } from "./WeatherIcon";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColor } from "@/hooks/useThemeColor";


export default function DayWeather(props: { day: string, weekDay: string, styles: object, thisShouldLoad: boolean } ) {


    const detailColor = useThemeColor({}, 'primaryText');

    
    return (
        <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-evenly', 
                            paddingVertical: 4, borderRadius: 10, ...props.styles }}>
            <View style={{ justifyContent: 'center' }}>
                <ThemedText>{props.weekDay}</ThemedText>
                <ThemedText>{props.day}</ThemedText>
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
                {props.thisShouldLoad ? (
                    <ActivityIndicator color={detailColor} />
                ) : (
                    <Icon name="chevron-right" size={30} color={detailColor} />
                )}
            </View>
        </ThemedView>
    );
}