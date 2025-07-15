import { TouchableOpacity, View } from "react-native";
import { Collapsible } from "../Collapsible";
import { ThemedText } from "../themedComps/ThemedText";
import { ThemedView } from "../themedComps/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";


type DescriptiveWeartherInfoProps = {
  title: string;
  data?: object;
};


export default function DescriptiveWeartherInfo({ title, data }: DescriptiveWeartherInfoProps) {


    const bgColor = useThemeColor({}, 'secondaryBg')
    const detailColor = useThemeColor({}, 'primaryDetails');
    const activeDetailColor = useThemeColor({}, 'secondaryDetails');


    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = function(): void {
        setShowMore(!showMore);
    }

    return(
        <View style={{ gap: 8 }}>
            <ThemedText type="subtitle">{title}: </ThemedText>
            <ThemedView 
            defaultColor='primaryBg' 
            style={{ 
                gap: 10, borderRadius: 10, 
                paddingHorizontal: 16, paddingVertical: 12,
                borderColor: detailColor, borderWidth: 2 
            }}>
                <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',     // ✅ Mantido — alinha os filhos verticalmente
                    justifyContent: 'center', // ✅ Mantido — centraliza os blocos horizontalmente
                    gap: 4,   
                }}
                onPress={toggleShowMore}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center'  }}>
                        <ThemedText type='defaultSemiBold'>23-29 </ThemedText>
                        <ThemedText type='defaultSemiBold'>| Média: 26 </ThemedText>
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                        style={{ 
                            paddingHorizontal: 20,
                            backgroundColor: bgColor,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: showMore ? activeDetailColor : detailColor,
                            alignSelf: 'flex-end'
                        }}
                        onPress={toggleShowMore}
                        >
                        <ThemedText type='subtitle'>+</ThemedText>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                {showMore && 
                (<View>
                    <View>
                        <ThemedText>Descrição: Clima calorento</ThemedText>
                        <ThemedText type="small">Perigo sair de casa sem garrafa d' água</ThemedText>
                    </View>
                    {/* <ThemedText>
                        The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
                        sets up the tab navigator.
                    </ThemedText> */}
                </View>)
                }
            </ThemedView>
        </View>
    )
}