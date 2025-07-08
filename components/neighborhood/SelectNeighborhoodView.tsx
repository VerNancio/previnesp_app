import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '../themedComps/ThemedText';
import { ThemedView } from '../themedComps/ThemedView';
import { ThemedScrollView } from '../themedComps/ThemedScrollView';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';




export default function SelectNeighborhoodView() {

    // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, defaultColor);

    // return <View style={[{ backgroundColor }, style]} {...otherProps} />;


    // const bgColor = useThemeColor({}, 'secondaryBg');
    const iconColor = useThemeColor({}, 'primaryText');

    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handlePress = () => {
        setIsPressed(true);
        useRouter().push(`/(drawer)/(tabs)/(stack)/modalSelectNeighborhood` as any);
    };
    
    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedText type="subtitle">Bairro: </ThemedText>
                <ThemedView defaultColor='secondaryBg' style={{ flex: 1, borderRadius: 10, marginVertical: 10, paddingVertical: 14,
                     ...(isPressed ? { borderColor: 'white', borderWidth: 2, marginVertical: 8 } : {}),
                 }} >
                        <TouchableOpacity 
                        style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}
                        onPressIn={() => handlePress()} onPressOut={() => setIsPressed(false)}>
                            <ThemedText type='defaultSemiBold'>Selecione o Bairro </ThemedText>
                            <View style={{ justifyContent: 'center' }}>
                                <Icon name="chevron-right" size={26} color={iconColor} />
                            </View>
                        </TouchableOpacity>
                </ThemedView>
        </ThemedView>
    );
}
