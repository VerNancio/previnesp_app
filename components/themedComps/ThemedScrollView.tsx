import { ScrollView, type ScrollViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  defaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedScrollView({ style, lightColor, darkColor, defaultColor = 'secondaryBg', ...otherProps }: ThemedScrollViewProps) {

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, defaultColor);

  return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
