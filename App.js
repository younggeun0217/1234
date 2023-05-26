import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // navigator 쓰기 위해서 필요
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // bottom navigator

import { MaterialIcons } from '@expo/vector-icons'; // expo icons 이미지
import { MaterialCommunityIcons } from '@expo/vector-icons'; // expo icons 이미지
import { Ionicons } from '@expo/vector-icons'; // expo icons 이미지

import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';

const BottomNavigator = createBottomTabNavigator();

function ExhibitionsOverview(pressed) {
  return (
    <BottomNavigator.Navigator screenOptions={{
      headerShown: false
    }}>
      <BottomNavigator.Screen 
        name='조회'
        component={MainScreen}
        options={{
          tabBarIcon: ({color, size}) =>
          <MaterialIcons name="search" size={size} color={color} />
        }}
      />
      <BottomNavigator.Screen 
        name='지도'
        component={MapScreen}
        options={{
          tabBarIcon: ({color, size}) =>
          <MaterialCommunityIcons name="map-marker-radius" size={size} color={color} />
        }}
      />
      <BottomNavigator.Screen
        name='일정' 
        component={MapScreen}
        options={{
          tabBarIcon: ({color, size}) =>
          <Ionicons name="calendar" size={size} color={color} />
          }}
      />
      <BottomNavigator.Screen 
        name='좋아요'
        component={MapScreen}
        options={{
          tabBarIcon: ({color, size}) =>
            <Ionicons name="heart-outline" size={size} color={color} />
          }}
      />
    </BottomNavigator.Navigator>
  );
}

export default function App() {

  let screen = <MainScreen />

  return (
    <>
      <StatusBar style='light' />
      <SafeAreaView style={styles.rootScreen}>
        <NavigationContainer>
          <ExhibitionsOverview />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  }
});
