import { View } from "react-native";
import { ThemedText } from "../themedComps/ThemedText";
import { WeatherIcon } from "./WeatherIcon";


export default function WeatherByHorary (props: { hour: string, styles: object, size: number }) {

    return (
        <View style={{ paddingVertical: 4, paddingHorizontal: 8, ...props.styles }}>
            <WeatherIcon size={ props.size } />
            <ThemedText>{ props.hour }</ThemedText>
        </View>
    );
}