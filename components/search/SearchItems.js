// 검색 결과 이미지, title, 장소, 날짜, 전시중
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { findIsLike, postDataInUserDB, findAndDeleteInUserDB } from "../../DB/firebase"; // DB 관련 기능

import { AntDesign } from '@expo/vector-icons'; // 하트 이미지 import

// function truncateText(text, maxLength) { // 전시회 검색 결과 텍스트들 글자 길이 설정
//     if (text.length > maxLength) {
//         return text.substring(0, maxLength) + "...";
//     }
//     return text;
// }

function SearchItems({result}) {
    const { title, thumbnail, exhibition, startDate, endDate, time, restDay, fee, callNumber, siteAddress, mainAuthor, otherAuthors,imageInformations, textInformation } = result; // result객체를 분해
    // const truncatedTitle = truncateText(title, 18); // 전시회 제목 글자 수 제한
    // const truncatedLocation = truncateText(location, 18); // 전시회 장소 글자 수 제한

    const navigation = useNavigation();

    const [onGoing, setOnGoing] = useState('전시중');
    const [isLike, setIsLike] = useState(false); // 좋아요 상태

    function likeHandler() {
        setIsLike(!isLike);
        if (!isLike) {
            postDataInUserDB(title, thumbnail, exhibition, startDate, endDate);
            console.log(isLike);
        } else {
            findAndDeleteInUserDB(title);
            console.log(isLike);
        }
    };

    useEffect(() => {
        findIsLike(title, setIsLike);
    }, []);

    function exhivitionPressHandler() {
        navigation.navigate('InformationScreen', {
            title: title,
            thumbnail: thumbnail,
            exhibition: exhibition,
            startDate: startDate,
            endDate: endDate,
            time: time,
            restDay: restDay,
            fee: fee,
            callNumber: callNumber,
            siteAddress: siteAddress,
            mainAuthor: mainAuthor,
            otherAuthors: otherAuthors,
            imageInformations: imageInformations,
            textInformation: textInformation,
        });
    }

    return (
        <View style={styles.root}>
            <Pressable onPress={exhivitionPressHandler} style={({pressed}) => pressed && styles.pressed}>
                <View style={styles.screen}>
                    <View style={styles.listItems}>
                        <Image style={styles.logoImage} source={{uri: thumbnail}} />
                        <View style={styles.lists}>
                            <Text style={styles.text}>{title}</Text>
                            <Text style={styles.text}>{exhibition}</Text>
                            <Text style={styles.text}>{startDate} ~ {endDate}</Text>
                            <View style={styles.heartBox}>
                                <Text style={styles.onGoing}>{onGoing}</Text>
                                <AntDesign style={styles.footerIcons} name={isLike ? "heart" : "hearto"} size={24} color="red" onPress={likeHandler} />
                            </View>
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
    },
    heartBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});