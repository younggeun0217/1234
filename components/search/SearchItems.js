// 검색 결과 이미지, title, 장소, 날짜, 전시중
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { deleteLikedExhibition, saveLikedExhibition, getAllLikedExhibitions } from "../../DB/localStorage";

import { AntDesign } from '@expo/vector-icons'; // 하트 이미지 import
import InfromationScreen from "../../screens/InformationScreen";
import { Modal } from "react-native";

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
    
    const today = new Date();

    const [onGoing, setOnGoing] = useState('전시중');
    const [isLike, setIsLike] = useState(false); // 좋아요 상태
    const [showInformation, setShowInformation] = useState(false);


    async function fetchIsLikeValue() { // 좋아요 상태 체크
        try {
            const likedExhibitions = await getAllLikedExhibitions();
            const isLiked = likedExhibitions.some((exhibition) => exhibition.title === title);
            setIsLike(isLiked);
        }   catch (error) {
            console.log("Error while fetching 'isLike' value:", error);
        }
      }
    
    useEffect(() => { // 렌더링 될 때 마다 
        fetchIsLikeValue(); // 좋아요 상태 체크
    }, []);


    function parseDate(dateString) { // 2023.08.01 을 new Date 형식으로 파싱
        const [year, month, day] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day);
    }

    useEffect(() => {
        const endDateFormatted = parseDate(endDate);
        const todayFormatted = new Date(today); 
        if (endDateFormatted < todayFormatted) {
            setOnGoing('전시종료');
        }
    }, []);

    function likeHandler() {
        setIsLike(!isLike);
        if (!isLike) {
            saveLikedExhibition(title, thumbnail, exhibition, startDate, endDate);
        } else {
            deleteLikedExhibition(title);
        }
    }

    const datas = {
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
        isLike: isLike,
        setIsLike: setIsLike,
        likeHandler: likeHandler
    }

    function openInformation() {
        setShowInformation(true);
    }

    function closeInformation() {
        setShowInformation(false);
    }



    return (
        <>
            <View style={styles.root}>
                <Pressable onPress={openInformation} style={({pressed}) => pressed && styles.pressed}>
                    <View style={styles.screen}>
                        <View style={styles.listItems}>
                            <Image style={styles.logoImage} source={{uri: thumbnail}} />
                            <View style={styles.lists}>
                                <Text style={styles.text}>{title}</Text>
                                <Text style={styles.text}>{exhibition}</Text>
                                <Text style={styles.text}>{startDate} ~ {endDate}</Text>
                                <View style={styles.heartBox}>
                                    <View style={onGoing === '전시중' ? styles.onGoingBox : [styles.onGoingBox, {borderColor: 'rgba(143, 134, 130, 1)'}]}>
                                        <Text style={onGoing === '전시중' ? styles.onGoing : [styles.onGoing, {color: 'rgba(143, 134, 130, 1)'}]}>{onGoing}</Text>
                                    </View>
                                    <AntDesign style={styles.footerIcons} name={isLike ? "heart" : "hearto"} size={24} color="red" onPress={likeHandler} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
                {showInformation && <Modal>
                        <InfromationScreen datas={datas} onCancel={closeInformation} />
                    </Modal>
                }
            </View>
            
        </>
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
    onGoingBox: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(243, 115, 59, 1)'
    },
    onGoing: { // 전시중일 때 글자 색 red
        color: 'rgba(243, 115, 59, 1)',
        marginHorizontal: 2
    },
    heartBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});