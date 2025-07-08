import { View } from 'react-native';
import { ThemedText } from '../themedComps/ThemedText';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColor } from '@/hooks/useThemeColor';


export type WeatherIconProps = {
//   frontIconColor?: string;
//   backIconColor?: string;
  color?: string;
  descWeatherText?: string;
  size?: number;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  horary?: string;
  day?: string;
};

export function WeatherIcon({
    // frontIconColor = 'white',
    // backIconColor = 'black',
    color,
    descWeatherText,
    size = 70,
    type = 'default',
    horary,
    day,
    ...rest
    }: WeatherIconProps) {

    const iconColor = useThemeColor({}, 'primaryText');
    

    // const now = new Date();

    // if (day == undefined) localDay = now.toISOString();
    // if (day == undefined) localHour = now.toLocaleTimeString();


    return(
        <View style={{ alignItems: 'center' }}>
            <View>
                <Icon
                name="weather-partly-cloudy" 
                size={size} 
                color={color?? iconColor}
                // style={{ position: 'absolute' }}
                />
                
                {/* <Icon 
                name="cloud" 
                size={size} 
                color="gray"
                /> */}
            </View>
            {descWeatherText && (
            <ThemedText type='custom' style={{ fontSize: 40, color: 'white' }}>
                {descWeatherText}
            </ThemedText>
            )}
        </View>
    )
}