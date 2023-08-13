import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="black" />
            <Text style={styles.text}>로딩중입니다.</Text> 
        </View>
    );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 20
    }
});