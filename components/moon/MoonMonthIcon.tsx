import type { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themedComps/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
// import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

const HEADER_HEIGHT = 170;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const color = useThemeColor({}, 'warning');
  
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView className="flex-1">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[
            { 
              backgroundColor: color, height: HEADER_HEIGHT,
              // paddingVertical: 20, paddingHorizontal: 30 
              justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', 
              paddingVertical: '10%', paddingHorizontal: '8%'
            },
            headerAnimatedStyle,
          ]}
          >
          <View style={{ flex: 1   }}>
            {headerImage}
          </View>
        </Animated.View>
        <ThemedView className="flex-1 overflow-hidden p-6 space-y-4" defaultColor='primaryBg'>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
