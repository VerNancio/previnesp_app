import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  defaultColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small' | 'smallSemiBold' | 'custom';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  defaultColor = 'primaryText',
  type = 'default',
  ...rest
}: ThemedTextProps) {

  
  const color = useThemeColor({ light: lightColor, dark: darkColor }, defaultColor);

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'smallSemiBold' ? styles.smallSemiBold : undefined,
        type === 'custom' ? style : undefined,        
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  small: {
    fontSize: 14,
    lineHeight: 24,
    // fontWeight: 'bold',
  },
  smallSemiBold: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
  },
});
