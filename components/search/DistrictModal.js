// 강남구, 강동구 등 서울시 지역구 list 설정하는 Modal
import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Dimensions, ScrollView } from "react-native";

import {DISTRICT} from '../../data/seoulDistrict'; // 서울 지역구 list 가져옮

function DistrictModal({pressed, onCancel, onSelectedDistrictList}) { // 메인 함수
    const [selectedDistrictList, setSelectedDistrictList] = useState([]); // 선택된 지역구들

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

    useEffect(() => { // 리스트에서 선택할 때 마다 SearchOptions에 list 전달
        onSelectedDistrictList(selectedDistrictList);
    }, [selectedDistrictList]);
      

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
                        <Pressable onPress={onCancel}>
                            <View style={styles.footerBox}>
                                <Text style={styles.footerText}>적용하기</Text>
                            </View>
                        </Pressable>
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
    footerBox: { // 적용하기 box
        backgroundColor: '#A3A098',
        borderColor: '#A3A098',
        borderWidth: 1,
        borderRadius: 16,
    },
    footerText: { // 적용하기 text
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    }
});