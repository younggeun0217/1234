// 전시 ~ find, 돋보기 이미지까지 검색 옵션들
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Platform, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // expo icons 이미지
import { Entypo } from '@expo/vector-icons'; // expo icons 이미지
import { MaterialIcons } from '@expo/vector-icons'; // expo icons 이미지
import DistrictModal from "./DistrictModal"; // SearchOption에서 Modal 관리

function SearchOptionList() {
    const [district, setDistrict] = useState(['']); // 서울 지역구 배열(List)
    const [modalIsVisible, setModalIsVisible] = useState(false); // 구 input칸 클릭 시 나오는 modal (true / false)

    function DistrictList({districts}) { // 서울 지역구 출력 함수
        return <Text style={styles.districtItems}>{districts}</Text>;
    }

    function openModal() { // Modal 열기
        setModalIsVisible(true);
    }

    function closeModal() { // Modal 닫기
        setModalIsVisible(false);
    }

    function handleSetDistrict(districts) { // district 상태를 handling하는 함수
        setDistrict(districts);
    }
    
    return (
        <View style={styles.screen}> 
            <View style={styles.subTitle1}>
                <TextInput style={styles.subTitleText} placeholder="전시"></TextInput>
            </View>
            <View style={styles.subTitle1}>
                <TextInput style={styles.subTitleText} placeholder="장소"></TextInput>
            </View>
            <View style={styles.subTitle2}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    horizontal={true}
                >
                {district.map((item, index) => (<DistrictList key={index} districts={item} />))}
                </ScrollView>
                <Pressable>
                    <Entypo name="triangle-right" size={24} color="#A3A098" onPress={openModal} />
                </Pressable>
            </View>
            <DistrictModal 
                pressed={modalIsVisible} 
                onCancel={closeModal}
                onSelectedDistrictList={handleSetDistrict}    
            />
            <View style={styles.subTitle2}>
                <Pressable>
                    <Text style={styles.districtItems}>2023-03-01</Text>
                </Pressable>
                <Text style={styles.districtText}>~</Text>
                <Pressable>
                    <Text style={styles.districtItems}>2023-06-01</Text>
                </Pressable>
                <Pressable>
                    <MaterialCommunityIcons name="calendar-multiple" size={24} color="#A3A098" />
                </Pressable>
            </View>
            <View style={styles.search}>
                <Pressable style={styles.searchUi}>
                    <Text style={styles.searchFont}>Find</Text>
                </Pressable>
                <Pressable>
                    <MaterialIcons name="search" size={48} color="#A3A098" />
                </Pressable>
            </View>
        </View>
    ); 
}

export default SearchOptionList;

const styles = StyleSheet.create({
    screen: {
        marginBottom: "5%"
    },
    subTitle1: { // 전시, 장소 boxes
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        backgroundColor: 'rgba(163, 160, 152, 0.1)',
        marginHorizontal: 30,
        marginBottom: 15
    },
    subTitle2: { // 지역구, 날짜 boxes
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        marginHorizontal: 30,
        marginBottom: 15,
    },
    subTitleText: { // 옵션에 작성되는 텍스트
        color: 'black',
        fontSize: 18
    },
    districtItems: { // 지역구, 날짜 border, fontsize...
        fontSize: 16,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 3,
        backgroundColor: 'rgba(163, 160, 152, 0.1)',
        borderRadius: 16,
    },
    districtText: { // ~ << css
        fontSize: 16,
        paddingHorizontal: 6,
        marginHorizontal: 10,
        marginVertical: 3,
        color: '#A3A098'
    },
    search: { // Find, 돋보기 box
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchUi: { // Find inner box
        marginHorizontal: 20,
        borderRadius: 24,
        backgroundColor: '#A3A098'
    },
    searchFont: { // Find 폰트
        fontSize: 24,
        paddingHorizontal: 24,
        paddingVertical: 8,
        color: 'white'
    },    
});