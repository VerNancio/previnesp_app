import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { ThemedText } from './themedComps/ThemedText';
import { ThemedView } from './themedComps/ThemedView';
import { ThemedScrollViewProps } from './themedComps/ThemedScrollView';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedTouchableOpacity } from './themedComps/ThemedTouchableOpacity';


export type SelectOptionScrollViewProps = ThemedScrollViewProps & {
    styles?: object;
    type?: 'squared' | 'rounded' | 'semiRounded';
    innerColor?: string;
    outerColor?: string;
    options: string[];
    setState: Function;
    currentState: string | null;
};

export default function SelectOptionScrollView({ styles, innerColor, outerColor, type = 'semiRounded', options, setState, currentState }: SelectOptionScrollViewProps) {

    const borderColor = useThemeColor({}, 'primaryDetails');
    const bgColor = useThemeColor({}, 'primaryBg');
    const buttonColor = useThemeColor({}, 'secondaryBg');
    const detailColor = useThemeColor({}, 'secondaryDetails');

    
    const handlePress = function (key: string): void {
        if (currentState === key) {
            setState(null);
            return;
        }

        setState(key);
    };

    return (
        <View style={{ 
            flex: 1, 
            marginVertical: 10, 
            padding: 14,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: borderColor,
            flexDirection: 'row', 
            gap: 6,
            backgroundColor: bgColor

         }}>       
            {options.map((option, index) => (
                <ThemedTouchableOpacity 
                    onPress={ () => handlePress(option) }
                    key={option} 
                    style={{ 
                    alignItems: 'center',
                    paddingVertical: 1,
                    paddingHorizontal: 7,
                    minWidth: 40,
                    // maxWidth: 70,
                    borderRadius: 10, 
                    borderWidth: 2,
                    backgroundColor: innerColor?? buttonColor,
                    borderColor: option == currentState ? detailColor : borderColor,
                    // marginLeft: index == 0 ? 10 : 0,
                    // marginRight: index == options.length - 1 ? 10 : 0,
                    }}>
                    <ThemedText type='small'>{option}</ThemedText>
                </ThemedTouchableOpacity>
            ))}
        </View>
    );
}
