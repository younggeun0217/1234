import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.text}>로딩중입니다.</Text> 
            <Text style={styles.text}>장기간 연결되지 않을 시</Text>
            <Text style={styles.text}>인터넷 연결을 확인해주세요.</Text>
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