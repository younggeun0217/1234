import { StatusBar } from 'expo-status-bar'; // 맨 위에 시간, 배터리...
import { SafeAreaView, StyleSheet } from 'react-native'; // 아이폰 노치 (SafeAreaView)
import { NavigationContainer } from '@react-navigation/native'; // navigator 쓰기 위해서 필요
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // bottom navigator

import { MaterialIcons } from '@expo/vector-icons'; // expo icons 이미지
import { MaterialCommunityIcons } from '@expo/vector-icons'; // expo icons 이미지
import { Ionicons } from '@expo/vector-icons'; // expo icons 이미지

import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import CalendarScreen from './screens/CalendarScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import ExhibitionsContextProvider from './store/exhibitions-context';

const BottomNavigator = createBottomTabNavigator();

function ExhibitionsOverview(pressed) { // 네비게이터 설정 함수
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
        component={CalendarScreen}
        options={{
          tabBarIcon: ({color, size}) =>
          <Ionicons name="calendar" size={size} color={color} />
          }}
      />
      <BottomNavigator.Screen 
        name='좋아요'
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color, size}) =>
            <Ionicons name="heart-outline" size={size} color={color} />
          }}
      />
    </BottomNavigator.Navigator>
  );
}

export default function App() {

  return (
    <>
      <StatusBar style='black' />
      <SafeAreaView style={styles.rootScreen}>
        <ExhibitionsContextProvider>
          <NavigationContainer>
            <ExhibitionsOverview />
          </NavigationContainer>
        </ExhibitionsContextProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    paddingTop: 45,
    paddingBottom: 15,
  }
});
