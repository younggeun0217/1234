// 검색 결과 이미지, title, 장소, 날짜, 전시중
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchExhibitions } from "../../DB/firebase";

function truncateText(text, maxLength) { // 전시회 검색 결과 텍스트들 글자 길이 설정
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}

function SearchItems({result}) {
    const { id, title, imageUrl, location, startDate, endDate } = result; // result객체를 분해
    const truncatedTitle = truncateText(title, 18); // 전시회 제목 글자 수 제한
    const truncatedLocation = truncateText(location, 18); // 전시회 장소 글자 수 제한

    const navigation = useNavigation();

    function exhivitionPressHandler() {
        navigation.navigate('InformationScreen', {
            exhibitionId: id
        });
    }

    const [fetchedExhibitions, setFetchedExhibitions] = useState([]);

    useEffect(() => {
        async function getExhibitions() {
            const exhibitions = await fetchExhibitions();
            setFetchedExhibitions(exhibitions);
        }
        getExhibitions();
    }, []);

    return (
        <View style={styles.root}>
            <Pressable onPress={exhivitionPressHandler} style={({pressed}) => pressed && styles.pressed}>
                <View style={styles.screen}>
                    <View style={styles.listItems}>
                        <Image style={styles.logoImage} source={{uri: imageUrl}} />
                        <View style={styles.lists}>
                            <Text style={styles.text}>{truncatedTitle}</Text>
                            <Text style={styles.text}>{truncatedLocation}</Text>
                            <Text style={styles.text}>{startDate} ~ {endDate}</Text>
                            <Text style={styles.onGoing}>전시중</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

export default SearchItems;

const styles = StyleSheet.create({
    root: {
        flex: 1
    },  
    screen: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    pressed: {
        opacity: 0.75,
    },
    listItems: { // 전시회 아이템들 box
        width:  '90%',
        marginBottom: 12
    },
    logoImage: { // 로고 이미지
        height: 250
    },
    text: { // 전시회 정보 text
        fontSize: 12
    },
    onGoing: { // 전시중일 때 글자 색 red
        color: 'red'
    }
});