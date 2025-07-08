import { TouchableOpacity } from "react-native";
import { ThemedText } from "./themedComps/ThemedText";


export type DegreeProps = {
  color?: string;
  fontSize?: number;
  degree: number;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'custom';
};

export default function Degree ({
    color = 'white',
    fontSize = 16,
    degree,
    type = 'default',
    ...rest
    }: DegreeProps) {

    return(
        <TouchableOpacity>
            <ThemedText style={{ fontSize: fontSize, color: color }} type={type}>{degree}°</ThemedText>
        </TouchableOpacity>
    )
};