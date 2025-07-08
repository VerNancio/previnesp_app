import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { ReactNode, useEffect } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';


type ModalGestureProps = {
  children: ReactNode;
};


const SCREEN_HEIGHT = Dimensions.get('window').height;


export default function ModalGesture({ children } : ModalGestureProps) {


  const router = useRouter();

  const bgColor = useThemeColor({}, 'primaryBg')

  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
  }, []);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(() => {
      if (translateY.value > SCREEN_HEIGHT * 0.25) {
        runOnJS(router.back)(); // fecha o modal
      } 
      else {
        translateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }); // volta ao topo
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: 1 - translateY.value / (SCREEN_HEIGHT * 0.5),
  }));

  return (
    <View style={styles.overlay}>
      <Stack.Screen
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          animation: 'fade'
        }}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={ [{ backgroundColor: bgColor }, styles.card, animatedStyle] }>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
  },
  card: {
    // borderWidth: 2,
    // borderTopColor: 'white',
    // borderColor: 'white',
    width: '100%',
    flex: 1,
    marginTop: '10%',
    padding: 24,
    // borderRadius: 24,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: '#fff8e1',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // opacity: 0.01,
    // elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
