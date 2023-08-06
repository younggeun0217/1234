import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Favorites from '../components/Fav/Favorites';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar btnStyle={'default'} />
      <View>
        <Text style={styles.pageTitle}>My Exhibition</Text>
      </View>
      <Favorites />
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 30,
    fontWeight: '100',
    color: '#A3A098',
  },
});
