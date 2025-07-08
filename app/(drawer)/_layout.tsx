import React, { JSX } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Drawer } from 'expo-router/drawer';

import { ThemedText } from '@/components/themedComps/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function CustomHeader(props: {iconColor: string}) {

  return(
    <View>
      <Icon name='profile' size={25} color={props.iconColor} />
      <ThemedText type='default' >Aaaaa</ThemedText>
    </View>
  )
}


export default function Layout() {

  const iconColor = useThemeColor({}, 'primaryText');
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
      // drawerContent={() => <CustomHeader iconColor='white' />}
      screenOptions={{
        // headerShown: false
      }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
              drawerLabel: 'Previsão',
              title: 'Previsão',
              drawerIcon: (): JSX.Element => (
                <Icon name='weather-partly-cloudy' size={25} color={iconColor} />
              )
              // headerShown: false
          }}
        />
        <Drawer.Screen
          name="alerts"
          options={{
              drawerLabel: 'Alertas',
              title: 'Alertas',
              drawerIcon: (): JSX.Element => (
                <Icon name='alert' size={25} color={iconColor} />
              )
              // headerShown: false
          }}
        />
        <Drawer.Screen
          name="configs"
          options={{
              drawerLabel: 'Configurações',
              title: 'Configurações',
              drawerIcon: (): JSX.Element => (
                <Icon name='cog' size={25} color={iconColor} />
              )
              // headerShown: false
          }}
        />
        </Drawer>
    </GestureHandlerRootView>
  );
}
