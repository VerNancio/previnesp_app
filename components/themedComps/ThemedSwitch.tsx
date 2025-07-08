import { useState } from "react";
import { View } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

import { Switch } from "react-native-gesture-handler";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";


export type ThemedSwitchProps = {
//   lightColor?: string;
//   darkColor?: string;
  enabledThumbDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  disabledThumbDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  enabledTrackDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  disabledTrackDefaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  onChangeFunction: Function
//   type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'custom';
};


export default function ThemedSwitch({
  enabledThumbDefaultColor = 'primaryText',
  disabledThumbDefaultColor = 'primaryText',
  enabledTrackDefaultColor = 'danger',
  disabledTrackDefaultColor = 'warning',
  onChangeFunction,
  ...rest
}: ThemedSwitchProps) {

    const [enabledThumbColor, disabledThumbColor] = [useThemeColor({}, enabledThumbDefaultColor), useThemeColor({}, disabledThumbDefaultColor)];
    const [enabledTrackColor, disabledTrackColor] = [useThemeColor({}, enabledTrackDefaultColor), useThemeColor({}, disabledTrackDefaultColor)];
    

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    };


    return (
        <ThemedView>
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
        </ThemedView>
    );
}