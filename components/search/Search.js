// 버튼 안누르면 SearchOptionList가 보이고 
// 버튼 누르면 SearchOptionList가 안보임
import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons'; // expo icons 이미지
import SearchOptions from "./SearchOptions";
import SearchResult from "./SearchResult";

function Search() {
    const [pressed, setPressed] = useState(true);

    const showOptionHandler = () => {
        setPressed(!pressed);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Find Exhibition</Text>
                <Pressable onPress={showOptionHandler}>
                    <Entypo name="triangle-down" size={24} color="#A3A098" />
                </Pressable>
            </View>
            {pressed ? <SearchOptions /> : null}
            <SearchResult pressed={pressed} />
        </View>
    );
}   

export default Search;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 20,
        textAlign: 'center',
    },
    titleText: {
        fontSize: 25,
        color: '#A3A098'
    },
});