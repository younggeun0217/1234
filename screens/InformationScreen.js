// 전시회 상세정보 screen
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Linking, Alert, Pressable } from "react-native";
import { useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { Share } from "react-native";

import { Ionicons } from '@expo/vector-icons'; // expo icons 이미지
import { AntDesign } from '@expo/vector-icons'; // 하트 이미지 import
import { Entypo } from '@expo/vector-icons'; // 공유 이미지 import

function InfromationScreen({datas, onCancel}) {
    const navigation = useNavigation();

    const title = datas.title; // 제목
    const thumbnail = datas.thumbnail; // 섬네일 링크
    const exhibition = datas.exhibition; // 전시회관
    const startDate = datas.startDate; // 시작일
    const endDate = datas.endDate; // 종료일
    const time = datas.time; // 관람 시간
    const restDay = datas.restDay; // 휴관일
    const fee = datas.fee; // 관람료
    const callNumber = datas.callNumber; // 관련 전화번호
    const siteAddress = datas.siteAddress; // 관련 사이트 주소
    const mainAuthor = datas.mainAuthor; // 작가명
    const otherAuthors = datas.otherAuthors; // 그외 작가명 (여러명인 경우)
    const imageInformations = datas.imageInformations; // 전시회 상세 정보 이미지들 링크
    const textInformation = datas.textInformation; // 전시회 상세 정보 텍스트 
    const setIsLike = datas.setIsLike;
    const likeHandler = datas.likeHandler;

    const [likeState, setLikeState] = useState(datas.isLike);

    let Authors = mainAuthor; // 작가명 전부 합친거

    if (otherAuthors !== 'null') { // 작가명 합침
    Authors += ',' + otherAuthors;
    }

    function setLikeHandler() {
        setIsLike(!datas.isLike);
        likeHandler();
        setLikeState(!likeState);
    }

    function linkHompepageHandler() {
        if (siteAddress !== null) {
            const url = siteAddress
            Linking.openURL(url);
        } else {
            Alert.alert('홈페이지 정보가 없습니다.', '전시회 관련 홈페이지가 존재하지 않습니다.');
        }
    }

    function Information({attribute, text}) { // 출력용 함수
        return (
            <View style={styles.informationBox}>
                <Text style={styles.informationAttribute}>{attribute}</Text>
                <Text style={styles.informationText}>{text}</Text>
            </View>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Pressable onPress={onCancel}>
                        <Ionicons
                            name="arrow-back"
                            size={36}
                            color="black"
                            style={{ marginLeft: 10 }}
                        />
                    </Pressable>
                    <Ionicons
                        name="home-outline"
                        size={36}
                        color="black"
                        style={{ marginRight: 10 }}
                        onPress={() => {
                            onCancel();
                            navigation.navigate('조회');
                        }}
                    />
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.headerText}>{title}</Text>
                    <Image style={styles.thumbnail} resizeMode="contain" source={{ uri: thumbnail }} />
                    <View style={styles.informationContainer}>
                        <Text style={styles.informationHeader}>전시 정보</Text>
                        <Information attribute={'장소'} text={exhibition} />
                        <View style={styles.informationBox}>
                            <Text style={styles.informationAttribute}>전시 기간</Text>
                            <Text style={styles.informationText}>{startDate} - {endDate}</Text>
                        </View>
                        <Information attribute={'관람 시간'} text={time} />
                        <Information attribute={'휴관일'} text={restDay} />
                        <Information attribute={'입장료'} text={fee} />
                        <Information attribute={'전화번호'} text={callNumber} />
                        <Information attribute={'작가'} text={Authors} />
                        <Text style={styles.informationHeader}>상세 정보</Text>
                        {imageInformations && imageInformations.map((url, index) => (
                            <View key={index}>
                                <Image style={styles.informationImage} resizeMode="contain" source={{ uri: url }} />
                            </View>
                        ))}
                        <Text style={styles.informationText}>{textInformation}</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerIconBox}>
                    <Pressable onPress={async () => await Share.share({ message: `\n제목: ${title}`, title: siteAddress, url: siteAddress})}>
                        <Entypo style={styles.footerIcons} name="share" size={36} color="black" />
                    </Pressable>
                    <AntDesign 
                        style={styles.footerIcons} 
                        name={likeState ? "heart" : "hearto"}
                        size={36} 
                        color="red" 
                        onPress={setLikeHandler} />
                </View>
                <View style={styles.footerTextBox}>
                    <TouchableOpacity onPress={linkHompepageHandler}>
                        <Text style={styles.footerText}>홈페이지</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default InfromationScreen;

const devideWidth = Dimensions.get('window').width; // 사용 기기 width
const deviceHeight = Dimensions.get('window').height; // 사용 기기 height

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBox: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    scrollContainer: {
        flex: 1
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#A3A098',
        marginBottom: 10,
        paddingLeft: 10
    },
    thumbnail: {
        width: '100%',
        height: 350,
    },
    informationContainer: {
        flex: 1,
        paddingHorizontal: 15
    },
    informationHeader: {
        color: '#A3A098',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        marginBottom: 10
    },
    informationBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#A3A098',
        marginBottom: 2
    },
    informationAttribute: {
        width: '20%',
        fontSize: 14,
        fontWeight: 'bold',
    },
    informationText: {
        fontSize: 14,
        marginBottom: 6
    },
    informationImage: {
        width: '100%',
        height: 350,
        marginBottom: 6
    },
    footer: { // footer 밑에 강제 고정
        width: devideWidth,
        height: (deviceHeight*0.1),
        borderTopColor: '#A3A098',
        borderTopWidth: 2,
        flexDirection: 'row',
    },
    footerIconBox: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerIcons: {
        paddingHorizontal: '7%'
    },
    footerTextBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '4%',
        backgroundColor: 'rgba(163, 160, 152, 0.2)'
    },
    footerText: {
        textAlign: 'center',
        fontSize: 20,
    }
})