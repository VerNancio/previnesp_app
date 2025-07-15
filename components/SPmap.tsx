import React, { useRef } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Svg, Path, Rect } from 'react-native-svg';
import bairros_sp from '@/assets/json/bairros_sp.json';
import { ThemedText } from './themedComps/ThemedText';
import { TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import District from '@/services/district/District';

type DistrictStateProps = {
  districtState: {
    getDistrict: string | null;
    setDistrict: (id: string | null) => void;
  };
  width: number;
  height: number;
};

const xmin = 0;
const ymin = -100;
const widthViewBox = 1000;
const heightViewBox = 1100;

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function SPmap({ districtState, width, height }: DistrictStateProps) {

  const { getDistrict, setDistrict } = districtState;


  const bgColor = useThemeColor({}, 'secondaryBg');
  const buttonColor = useThemeColor({}, 'secondaryDetails');
  const borderColor = useThemeColor({}, 'primaryDetails');


  const initialScale = MIN_SCALE;
  const initialTranslateX = (width - widthViewBox * initialScale) / 2 + 350;
  const initialTranslateY = (height - heightViewBox * initialScale) / 2 + 30;

  const scale = useSharedValue(initialScale);
  const translateX = useSharedValue(initialTranslateX);
  const translateY = useSharedValue(initialTranslateY);

  const panRef = useRef(null);
  const pinchRef = useRef(null);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx: { startX: number; startY: number }) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      const scaledWidth = widthViewBox * scale.value;
      const scaledHeight = heightViewBox * scale.value;

      const minTranslateX = width - scaledWidth + 400;
      const minTranslateY = height - scaledHeight - 50;

      let nextX = ctx.startX + event.translationX;
      let nextY = ctx.startY + event.translationY;

      translateX.value = Math.min(Math.max(nextX, minTranslateX), 400);
      translateY.value = Math.min(Math.max(nextY, minTranslateY), -50);
    },
  });

  const pinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event) => {
      const zoomSpeedFactor = 0.05;
      const deltaScale = 1 + (event.scale - 1) * zoomSpeedFactor;
      let newScale = scale.value * deltaScale;
      newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
      scale.value = newScale;
    },
    onEnd: () => {
      const scaledWidth = widthViewBox * scale.value;
      const scaledHeight = heightViewBox * scale.value;

      const minTranslateX = width - scaledWidth + 400;
      const minTranslateY = height - scaledHeight - 50;

      translateX.value = withTiming(Math.min(Math.max(translateX.value, minTranslateX), 400));
      translateY.value = withTiming(Math.min(Math.max(translateY.value, minTranslateY), -50));
      scale.value = withTiming(Math.min(Math.max(scale.value, MIN_SCALE), MAX_SCALE));
    },
  });

    function zoomIn() {
        scale.value = withTiming(Math.min(scale.value + 0.4, MAX_SCALE));
    }

    function zoomOut() {
        scale.value = withTiming(Math.max(scale.value - 0.4, MIN_SCALE));
    }

    function resetPosition() {
        translateX.value = withTiming(initialTranslateX);
        translateY.value = withTiming(initialTranslateY);

        scale.value = withTiming(Math.max(1, MIN_SCALE));
    }



  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));


  const districtService = new District();
  
  // let districtId: string | null = null;
  let districtName: string | null = null;
  
  
  const storageDistrict = async (): Promise<boolean> => {

    let districtName = getDistrict;

    const wasStoraged = await districtService.storageDistrict(districtName);
    
    if (!wasStoraged) {
      console.log('Nao deu certo, nao foi salvo');
      return false
    }

    return wasStoraged;
  };

  const onSelectDistrict = (name: string) => {
    if (getDistrict === name) {
      setDistrict(null);
      return;
    }

    setDistrict(name);
  };

  const confirmingSeletedDistrict = () => {
    storageDistrict();
    useRouter().back();
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MaskedView
        style={{ width: width, height: height, position: 'relative' }}
        maskElement={
          <Svg width={width} height={height}>
            <Rect x="0" y="0" width={width} height={height} fill="black" />
          </Svg>
        }>
        {/* View para os botões fixos, sobrepostos no canto inferior direito */}
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={panGesture}
          simultaneousHandlers={pinchRef}
          minPointers={1}
          maxPointers={1}
        >
          <Animated.View style={{ width: width, height: height, overflow: 'hidden' }}>
            <PinchGestureHandler
              ref={pinchRef}
              onGestureEvent={pinchGesture}
              simultaneousHandlers={panRef}
              minPointers={2}
              maxPointers={2}
            >
            <Animated.View style={{ 
                width: width, 
                height: height, 
                justifyContent: 'center', 
                backgroundColor: bgColor,
                overflow: 'hidden',
                borderRadius: 10, 
                borderWidth: 2,
                borderColor: borderColor
            }}>
                <Animated.View style={[{ width: 10, height: 10 }, animatedStyle]}>
                  <Svg
                    width={width}
                    height={height}
                    viewBox={`${xmin} ${ymin} ${widthViewBox - 20} ${heightViewBox + 160}`}
                  >
                    <Rect
                      x={xmin}
                      y={ymin}
                      width={widthViewBox}
                      height={heightViewBox}
                      fill="transparent"
                    />
                    {bairros_sp.map((bairro) => (
                      <Path
                        key={bairro.name}
                        d={bairro.d}
                        fill={getDistrict === bairro.name ? buttonColor : 'white'}
                        stroke="black"
                        strokeWidth={1}
                        pointerEvents="auto"
                        onStartShouldSetResponder={() => true}
                        onResponderRelease={() => runOnJS(onSelectDistrict)(bairro.name)}
                      />
                    ))}
                  </Svg>
                </Animated.View>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </MaskedView>
      <View
        style={{
            position: 'absolute',
            top: 20,
            right: 20,
            flexDirection: 'column',
            zIndex: 10,
        }}>
          {/* Botão de confirmação */}
          <TouchableOpacity
              disabled={getDistrict === null ? true : false}
              onPress={() => confirmingSeletedDistrict()}
              style={{
              backgroundColor: buttonColor,
              opacity: getDistrict === null ? 0.30 : 1,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 10,
              marginBottom: 10,
              // width: 80,
              // height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              }}
          >
              <ThemedText type='smallSemiBold' style={{ color: 'white' }}>Confirmar Escolha</ThemedText>
          </TouchableOpacity>
      </View>
      <View
        style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            flexDirection: 'column',
            zIndex: 10,
        }}>
            {/* Botão Zoom In */}
            <TouchableOpacity
                onPress={zoomIn}
                style={{
                backgroundColor: buttonColor,
                padding: 10,
                borderRadius: 25,
                marginBottom: 10,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <ThemedText type='title' style={{ color: 'white', fontSize: 30 }}>+</ThemedText>
            </TouchableOpacity>

            {/* Botão Zoom Out */}
            <TouchableOpacity
                onPress={zoomOut}
                style={{
                backgroundColor: buttonColor,
                padding: 10,
                borderRadius: 25,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <ThemedText type='title' style={{ color: 'white', fontSize: 30 }}>−</ThemedText>
            </TouchableOpacity>

        <TouchableOpacity
        onPress={resetPosition}
        style={{
            backgroundColor: buttonColor,
            padding: 10,
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10, 
        }}
        >
            <ThemedText type="title" style={{ color: 'white', fontSize: 20 }}>↺</ThemedText>
        </TouchableOpacity>

        </View>
    </GestureHandlerRootView>
  );
}
