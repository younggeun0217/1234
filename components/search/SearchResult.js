// 검색 결과
import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import SearchItems from "./SearchItems"; // SearchResult에서 SearchItems를 핸들링

function SearchResult({pressed}) {
    const searchResults = ExhibitionList(); // 더미 데이터들
    const [exhibitionData, setExhibitionData] = useState(searchResults); // 더미 데이터들을 useState로 관리
    const [numColumns, setNumColumns] = useState(2); // 전시회 결과를 가로 열에 2개씩 배열

    function ExhibitionList() { // 더미 데이터들 (더미 데이터로 검색 연습하려면 지역구도 넣어야 함)
        const exhibition1 = {
            title: '참조점',
            imageUrl: "https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/fa3fba495cdbf61d5d50f96c2315bf27_.jpg",
            location : '더레퍼런스/서울',
            startDate: '2023.05.19',
            endDate: '2023.05.28'
        };
        const exhibition2 = {
            title: '강우솔, 임아진:(불)응하는 몸',
            imageUrl: "https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/9d1b2eafad0bf994af86e2264f1101b5_aeba0a70bccda99b615dc39434ea5976_345622143_206535278842503_6575964803203688317_n.jpg",
            location : '스페이스 미라주/서울',
            startDate: '2023.05.18',
            endDate: '2023.06.01'
        };
        const exhibition3 = {
            title: '캐브 먼데이:Making a Scene',
            imageUrl: "https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/d77cf291d6214dadbf64b1d74d704203_.jpg",
            location : 'VIVIAN CHOI GALLERY(비비안초이갤러리)/서울',
            startDate: '2023.05.18',
            endDate: '2023.06.10'
        };
        const exhibition4 = {
            title: '봄의제전',
            imageUrl: "https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/6a11c73de2f36c10613ef5b859f17bad_.png",
            location : '프린트베이커리 더현대서울점/서울',
            startDate: '2023.05.18',
            endDate: '2023.06.07'
        };
        const exhibition5 = {
            title: '봄의제전',
            imageUrl: "https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/6a11c73de2f36c10613ef5b859f17bad_.png",
            location : '프린트베이커리 더현대서울점/서울',
            startDate: '2023.05.18',
            endDate: '2023.06.07'
        };
        const exhibition6 = {
            title: '봄의제전',
            imageUrl: "https://art-map.co.kr/art-map/public//upload/2023/05/exhibition/6a11c73de2f36c10613ef5b859f17bad_.png",
            location : '프린트베이커리 더현대서울점/서울',
            startDate: '2023.05.18',
            endDate: '2023.06.07'
        };
        
        const testData = [exhibition1, exhibition2, exhibition3, exhibition4, exhibition5, exhibition6];
    
        return testData; // 더미 데이터 반환
    }

    return (
        <View style={pressed ? styles.defaultScreen : styles.extendedScreen}>
            <FlatList 
                data={exhibitionData} 
                renderItem={({item}) => <SearchItems result={item} />} 
                keyExtractor={(item) => item.title} 
                numColumns={numColumns} 
                showsVerticalScrollIndicator={false} 
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
    }
});