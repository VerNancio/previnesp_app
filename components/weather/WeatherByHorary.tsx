import { View } from "react-native";
import { ThemedText } from "../themedComps/ThemedText";
import { WeatherIcon } from "./WeatherIcon";


export default function WeatherByHorary (props: { hour: string, styles: object, size: number }) {

    return (
        <View style={{ paddingVertical: 6, paddingHorizontal: 8, ...props.styles }}>
            <View style={{ flexDirection: 'row'}}>
                <WeatherIcon size={ props.size } />
                <ThemedText type='small'>17°</ThemedText>
            </View>
            <ThemedText type="small">{ props.hour }</ThemedText>
        </View>
    );
}