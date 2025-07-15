import ModalGesture from '@/components/ModalGesture';
import SPmap from '@/components/SPmap';
import { ThemedText } from '@/components/themedComps/ThemedText';
import { ThemedView } from '@/components/themedComps/ThemedView';
import { useState } from 'react';
import { Dimensions, View, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const MAP_VIEW_HEIGHT = height * 0.65;
const MAP_VIEW_WIDTH = width * 0.85;

const MAP_HEIGHT = MAP_VIEW_HEIGHT * 1;
const MAP_WIDTH = width * 0.85;


// type ModalSelectDistrictProps = {
//   districtState: {
//     getDistrict: string | null;
//     setDistrict: (id: string | null) => void;
//   };
// };

export default function ModalSelectDistrict() {

    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);


    return (
        <View style={{ flex: 1 }}>
        <ModalGesture>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 10 }}>
                <ThemedView style={{ paddingHorizontal: 10 }}>
                    <ThemedText type='subtitle'>Selecione o bairro: {selectedDistrict}</ThemedText>
                </ThemedView>
                <View style={{ 
                    width: MAP_VIEW_WIDTH, 
                    height: MAP_VIEW_HEIGHT, 
                    alignSelf: 'center', 
                }}>
                    <SPmap
                    width={MAP_WIDTH}
                    height={MAP_HEIGHT}
                    districtState={{ getDistrict: selectedDistrict, setDistrict: setSelectedDistrict }}
                    />
                </View>
            </View>
            </ModalGesture>
        </View>
    );
}
