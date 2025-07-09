import { View } from 'react-native';

import { ThemedText } from '../themedComps/ThemedText';
import { ThemedView } from '../themedComps/ThemedView';

import { useState } from 'react';

import HourRangeSelector from '../rangeSelector/HourRangeSelector';
import SelectOptionScrollView from '../SelectOptionScrollView';
import DescriptiveWeartherInfo from './DescriptiveWeartherInfo';
import DayRangeSelector from '../rangeSelector/DayRangeSelector';



export default function AverageTempView() {

    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    let regioes: string[] = ['ZS', 'ZO', 'ZN', 'ZL', 'CE', 'ME'];

    
    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedText type="subtitle">Análise do tempo: </ThemedText>
                <ThemedView defaultColor='secondaryBg' style={{ flex: 1, borderRadius: 10, marginVertical: 10, paddingVertical: 20 }} >
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <ThemedText type='subtitle'>Regiões:</ThemedText>
                            <View style={{ alignItems: 'center' }}>
                                <SelectOptionScrollView currentState={selectedRegion} setState={setSelectedRegion} options={regioes} />
                            </View>
                        </View>
                        <View style={{ paddingVertical: 20, gap: 10 }}>
                            <View>
                                <DayRangeSelector />
                            </View>
                            <View>
                                <HourRangeSelector />
                            </View>
                        </View>
                        <View style={{ gap: 18, paddingHorizontal: 20 }}>
                            <DescriptiveWeartherInfo title='Temperatura' />
                            <DescriptiveWeartherInfo title='Precipitação' />
                            <DescriptiveWeartherInfo title='Humidade' />
                            <DescriptiveWeartherInfo title='Força do Vento' />
                            <DescriptiveWeartherInfo title='Nebulosidade' />
                            <DescriptiveWeartherInfo title='Indíce UV' />
                        </View>
                    </View>
                    {/* Botao de teste */}
                    {/* <TouchableOpacity onPress={alert(selectedRegion)}>show curr</TouchableOpacity> */}
                </ThemedView>
        </ThemedView>
    );
}
