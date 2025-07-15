import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '../themedComps/ThemedText';
import { ThemedView } from '../themedComps/ThemedView';
import { ThemedScrollView } from '../themedComps/ThemedScrollView';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import District from '@/services/district/District';
import { useFocusEffect } from 'expo-router';




export default function SelectDistrictView() {

    const districtService = new District();

    const [districtName, setDistrictName] = useState<string | null>(null)

    const loadDistrictName = async () => {
        let name: string | null = await districtService.getDistrictName() ?? null;

        if (name) {
            setDistrictName(name);
        }
    };

    useFocusEffect(
        useCallback(() => {
        loadDistrictName(); 
        }, [])
    );


    const iconColor = useThemeColor({}, 'primaryText');

    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handlePress = () => {
        setIsPressed(true);
        useRouter().push(`/(drawer)/(tabs)/(stack)/modalSelectDistrict` as any);
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
                            { districtName ?
                                <ThemedText type='defaultSemiBold'>{districtName} </ThemedText>
                                    :
                                <ThemedText type='defaultSemiBold'>Selecione o Bairro </ThemedText>
                            }
                            <View style={{ justifyContent: 'center' }}>
                                <Icon name="chevron-right" size={26} color={iconColor} />
                            </View>
                        </TouchableOpacity>
                </ThemedView>
        </ThemedView>
    );
}
