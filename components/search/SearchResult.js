// DB 검색 결과
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import SearchItems from "./SearchItems"; // SearchResult에서 SearchItems를 핸들링
import { ExhibitionsContext } from "../../store/exhibitions-context";
import { fetchExhibitions } from "../../DB/firebase";

function SearchResult({pressed}) {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const exhibitionsCtx = useContext(ExhibitionsContext);

    useEffect(() => {
        async function getExhibitions() {
            setIsFetching(true);
            try {
                const exhibitions = await fetchExhibitions();
                exhibitionsCtx.setExhibitions(exhibitions);
            } catch(error) {
                setError('Error');
            }
            setIsFetching(false);
        }
        getExhibitions();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) { // 추후 에러 화면 작성 예정
        return <Text>에러남</Text>;
    }

    if (isFetching) { // 추후 로딩중 텍스트(화면) 작성 예정
        return <Text>로딩중</Text>;
    }

    const resultExhibitions = exhibitionsCtx.exhibitions;

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <SearchItems result={item} />
        </View>
    );

    return (
        <View style={pressed ? styles.defaultScreen : styles.extendedScreen}>
            <FlatList 
                style={styles.flatStyle}
                data={resultExhibitions} 
                renderItem={renderItem} 
                keyExtractor={(item) => item.title} 
                numColumns={2} 
                showsVerticalScrollIndicator={false} 
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
}

export default SearchResult;

const styles = StyleSheet.create({
    defaultScreen: { // 검색 옵션 있을 때
        flex: 1,
        paddingLeft: 30,
        paddingRight: 10
    },
    extendedScreen: { // 검색 옵션 없앴을 때
        flex: 1,
        paddingLeft: 30,
        paddingRight: 10,
        height: '89%'
    },
    columnWrapper: {
        justifyContent: 'space-between',
      },
    contentContainer: {
        padding: 10,
    },
    itemContainer: {
        width: '50%',
    }
});