import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import MainScreen from './screens/MainScreen';

export default function App() {

  let screen = <MainScreen />

  return (
    <>
      <StatusBar style='light' />
      <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  }
});
