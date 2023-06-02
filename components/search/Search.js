// 메인화면 Search와 관련된 모든 것들을 관리
import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // expo icons 이미지
import SearchOptions from "./SearchOptions"; // 검색 옵션들
import SearchResult from "./SearchResult"; // 검색 결과

function Search() {
    const [pressed, setPressed] = useState(false); // 눌렀는지 확인

    const showOptionHandler = () => { // 누를때마다 pressed 변수 false / true 변경
        setPressed(!pressed);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Find Exhibition</Text>
                <Pressable onPress={showOptionHandler}>
                    <Ionicons name={[pressed ? "caret-down-outline" : "caret-forward-outline"]} size={24} color="#A3A098" />
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
    title: { // Find Exhibition 과 접는 화살표 box 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    titleText: { // Find Exhibition
        fontSize: 25,
        color: '#A3A098'
    },
});