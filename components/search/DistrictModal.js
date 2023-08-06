// 강남구, 강동구 등 서울시 지역구 list 설정하는 Modal
import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Dimensions, ScrollView } from "react-native";

import {DISTRICT} from '../../data/seoulDistrict'; // 서울 지역구 list 가져옮
import { FontAwesome } from '@expo/vector-icons'; // 새로고침 이미지

function DistrictModal({pressed, onCancel, onSelectedDistrictList, district, setDistrict}) { 
    const [selectedDistrictList, setSelectedDistrictList] = useState(district); // 선택된 지역구들

    function selectDistrict({district}) { // id와 name을 객체로 받아옮 + 지역구 선택 안하면 추가, 이미 선택 했으면 없애는 함수
        setSelectedDistrictList((prevSelectedDistrictList) => {
            const isDistrictSelected = prevSelectedDistrictList.includes(district.name);

            if (isDistrictSelected) { // 이미 있으면 filtering해서 제거
                return prevSelectedDistrictList.filter(
                    (prevDistrict) => prevDistrict !== district.name
                );
            } else { // 없으면 id순으로 sort해서 추가
                const sortedDistrictList = [...prevSelectedDistrictList, district.name];
                sortedDistrictList.sort((a, b) => {
                    const districtA = DISTRICT.find((item) => item.name === a);
                    const districtB = DISTRICT.find((item) => item.name === b);
                    return districtA.id - districtB.id;
                });
                return sortedDistrictList; // 정렬된 list return
            }
        });
    }

    function handleRefresh() { // 자치구 선택 초기화 함수
        setSelectedDistrictList([]);
        setDistrict([]);
    }

    useEffect(() => {
        if (pressed && selectedDistrictList.length > 0) {
          onSelectedDistrictList(selectedDistrictList);
        }
    }, [selectedDistrictList, pressed]);

    return( 
        <>
            <Modal visible={pressed} animationType="slide" transparent={false}>
                <View style={styles.screen}>
                    <ScrollView>
                        <View style={styles.districtListContainer}>
                            <Text style={styles.districtHeader}>서울 자치구 선택</Text>
                            {DISTRICT.map(district => (
                                <View key={district.id} style={[styles.districtList, selectedDistrictList.includes(district.name) && styles.selectedDistrictList]}>
                                    <Text  
                                        style={styles.districtText} onPress={() => selectDistrict({district})}>{district.name}
                                    </Text>
                                </View>
                            ))}    
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <View style={styles.footerContainer}>
                            <Pressable onPress={onCancel}>
                                <View style={styles.footerTextBox}>
                                    <Text style={styles.footerText}>적용하기</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={handleRefresh}>
                                <FontAwesome name="refresh" size={36} color="black" style={styles.footerRefresher} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default DistrictModal;

const devideWidth = Dimensions.get('window').width; // 사용 기기 width
const deviceHeight = Dimensions.get('window').height; // 사용 기기 height

const styles = StyleSheet.create({
    screen: { // Modal Screen
        flex: 1,
    },
    districtListContainer: { // List container
        width: devideWidth,
    },
    districtHeader: { // 서울 지역구 선택 header
        textAlign: 'center',
        fontSize: 24,
        paddingVertical: 10,
        color: '#A3A098',
        borderBottomColor: '#A3A098',
        borderBottomWidth: 1
    },
    districtList: { // 지역구 list box
        flex: 1,
        paddingVertical: 6,
        borderBottomColor: '#A3A098',
        borderBottomWidth: 1,
    },
    selectedDistrictList: { // 선택된 지역들 색칠
        backgroundColor: 'rgba(163, 160, 152, 0.3)'
    },
    districtText: { // List Text
        fontSize: 35,
    },
    footer: { // footer 밑에 강제 고정
        width: devideWidth,
        height: (deviceHeight*0.08),
        borderTopColor: '#A3A098',
        borderTopWidth: 2,
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 120
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerTextBox: { // 적용하기 Textbox
        width: '130%',
        backgroundColor: '#A3A098',
        borderColor: '#A3A098',
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: 'center'
    },
    footerText: { // 적용하기 text
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
    footerRefresher: { // 새로고침
        color: '#A3A098',
        marginLeft: 60
    }
});