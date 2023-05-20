import { View, StyleSheet, Dimensions } from "react-native";

import Title from "../ui/Title";
import Search from "../components/search/Search";

function MainScreen(){
    return (
        <View style={styles.screen}>
            <Title>Art Calendar</Title>
            <View style={styles.rootContainer}>
                <Search />
            </View>
        </View>
    );
}

export default MainScreen;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
    },
});