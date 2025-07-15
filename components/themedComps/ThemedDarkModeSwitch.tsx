import { useState } from "react";
import { Appearance, View } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

import { Switch } from "react-native-gesture-handler";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";


export type DarkModeSwitchProps = {
//   lightColor?: string;
//   darkColor?: string;
  enabledThumbDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  disabledThumbDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  enabledTrackDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  disabledTrackDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  onChangeFunction: Function
//   type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'custom';
};


export default function DarkModeSwitch({
  enabledThumbDefaultColor = 'white',
  disabledThumbDefaultColor = 'white',
  enabledTrackDefaultColor = 'secondaryDetails',
  disabledTrackDefaultColor = 'primaryDetails',
  onChangeFunction,
  ...rest
}: DarkModeSwitchProps) {

    const bgColor = useThemeColor({}, 'secondaryBg');
    const borderColor = useThemeColor({}, 'primaryDetails');


    const [enabledThumbColor, disabledThumbColor] = [useThemeColor({}, enabledThumbDefaultColor), useThemeColor({}, disabledThumbDefaultColor)];
    const [enabledTrackColor, disabledTrackColor] = [useThemeColor({}, enabledTrackDefaultColor), useThemeColor({}, disabledTrackDefaultColor)];
    

    const [isEnabled, setIsEnabled] = useState(Appearance.getColorScheme() === 'dark' ? true : false);

    const toggleSwitch = () => {
      setIsEnabled(!isEnabled);
      alert(isEnabled)
    };


    return (
        <View style={{ 
          backgroundColor: bgColor, 
          borderRadius: 10,
          // borderWidth: 2,
          // borderColor: borderColor,
          alignItems: 'center',
          flexDirection: 'row', 
          justifyContent: 'space-around',
          paddingVertical: 10,
        }}>
            <View>
                <ThemedText type="subtitle">Dark Mode:</ThemedText>
            </View>
            <Switch 
            // style={{backgroundColor: 'red'}}
            // style={{ transform:[{ scaleX: 2 }, { scaleY: 2 }] }} 
            value={ isEnabled }
            onValueChange={ () => { 
              toggleSwitch()      
              onChangeFunction()
              } 
            } 
            
            thumbColor={ isEnabled ? enabledThumbColor : disabledThumbColor }
            trackColor={{ true: enabledTrackColor, false: disabledTrackColor}}
            />
        </View>
    );
}