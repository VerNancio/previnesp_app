import { View } from "react-native";
import { Collapsible } from "../Collapsible";
import { ThemedText } from "../themedComps/ThemedText";
import { ThemedView } from "../themedComps/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";


type DescriptiveWeartherInfoProps = {
  title: string;
  data?: object;
};


export default function DescriptiveWeartherInfo({ title, data }: DescriptiveWeartherInfoProps) {

    const detailColor = useThemeColor({}, 'primaryDetails');


    return(
        <View style={{ gap: 12 }}>
            <View style={{ gap: 8 }}>
                <ThemedText type="subtitle">{title}: </ThemedText>
                <ThemedView defaultColor='primaryBg' style={{ gap: 10, borderRadius: 10, 
                                                        paddingHorizontal: 16, paddingVertical: 12,
                                                        borderColor: detailColor, borderWidth: 2 }}>
                    <View style={{ gap: 4 }}>
                        <ThemedText type='defaultSemiBold'>Médias: 23</ThemedText>
                        <ThemedText type='defaultSemiBold'>Máximas: 29</ThemedText>
                        <ThemedText type='defaultSemiBold'>Mínimas: 16</ThemedText>
                    </View>
                    <View>
                        <Collapsible title="Saiba +">
                        <ThemedText>
                            Descrição:
                            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
                            <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
                        </ThemedText>
                        <ThemedText>
                            The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
                            sets up the tab navigator.
                        </ThemedText>
                        </Collapsible>
                    </View>
                </ThemedView>
            </View>
        </View>
    )
}