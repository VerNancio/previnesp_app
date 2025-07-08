import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  defaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedView({ style, lightColor, darkColor, defaultColor = 'primaryBg', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, defaultColor);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
