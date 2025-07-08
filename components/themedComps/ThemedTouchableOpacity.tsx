import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  defaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedTouchableOpacity({ style, lightColor, darkColor, defaultColor = 'secondaryBg', ...otherProps }: ThemedTouchableOpacityProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, defaultColor);

  return <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}
