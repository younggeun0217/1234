// 맨 위에 있는 title : Art Calendar (UI)
import { Text, StyleSheet } from "react-native";

function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        paddingTop: 45,
        paddingBottom: 15,
        backgroundColor: '#A3A098',
    }
});