import { View, StyleSheet, Text } from 'react-native';

import Title from '../ui/Title';
import Map from '../components/Map/map';

function MapScreen() {
  return (
    <View style={styles.screen}>
      <Title>Art Calendar:Seoul</Title>
      <Text
        style={{
          color: '#A3A098',
          
          lineHeight: 38,
          fontSize: 30,
        }}
      >
        Map
      </Text>

      <View style={styles.rootContainer}>
        <Map />
      </View>
    </View>
  );
}
export default MapScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    paddingTop: 5,
  },
});
