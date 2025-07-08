import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '../themedComps/ThemedText';
import { ThemedView } from '../themedComps/ThemedView';
import { ThemedScrollView } from '../themedComps/ThemedScrollView';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectOptionScrollView from '../SelectOptionScrollView';
import DescriptiveWeartherInfo from './DescriptiveWeartherInfo';



export default function AverageTempView() {

    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    let regioes: string[] = ['ZS', 'ZO', 'ZN', 'ZL', 'CE', 'ME'];

    
    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedText type="subtitle">Análise do tempo: </ThemedText>
                <ThemedView defaultColor='secondaryBg' style={{ flex: 1, borderRadius: 10, marginVertical: 10, paddingVertical: 20, paddingHorizontal: 20}} >
                    <View style={{ flex: 1 }}>
                        <View>
                            <SelectOptionScrollView currentState={selectedRegion} setState={setSelectedRegion} options={regioes} />
                        </View>
                        <View style={{ gap: 12 }}>
                            <DescriptiveWeartherInfo title='Temperatura' />
                            <DescriptiveWeartherInfo title='Precipitação' />
                            <DescriptiveWeartherInfo title='Humidade' />
                            <DescriptiveWeartherInfo title='Força do Vento' />
                            <DescriptiveWeartherInfo title='Nebulosidade' />
                        </View>
                    </View>
                    {/* Botao de teste */}
                    {/* <TouchableOpacity onPress={alert(selectedRegion)}>show curr</TouchableOpacity> */}
                </ThemedView>
        </ThemedView>
    );
}
