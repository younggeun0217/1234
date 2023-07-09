// 전시 ~ find, 돋보기 이미지까지 검색 옵션들
import { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Pressable, Alert, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // expo icons 이미지
import { Entypo } from '@expo/vector-icons'; // expo icons 이미지
import { MaterialIcons } from '@expo/vector-icons'; // expo icons 이미지

import DistrictModal from "./DistrictModal"; // SearchOption에서 Modal 관리
import DateTimePicker from '@react-native-community/datetimepicker'; // 달력에서 날짜 선택
import SearchItems from "./SearchItems"; // SearchResult에서 SearchItems를 핸들링
import { ExhibitionsContext } from "../../store/exhibitions-context";
import { fetchExhibitions } from "../../DB/firebase";

function SearchOptions({pressed}) {
    const [exhibitionName, setExhibitionName] = useState('');
    const [exhibitionLocation, setExhibitionLocation] = useState('');
    const [district, setDistrict] = useState();

    const [modalIsVisible, setModalIsVisible] = useState(false); // 구 input칸 클릭 시 나오는 modal (true / false)
    
    const [startDate, setStartDate] = useState(new Date()); // 시작일
    const [endDate, setEndDate] = useState(() => { // 종료일 (시작일 + 30일)
        const nextDate = new Date(startDate);
        nextDate.setDate(startDate.getDate() + 30);
        return nextDate;
    });
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false); 

    function showStartDateTimePicker() {
        setShowStartPicker(true);
    };

    function showEndDateTimePicker() {
        setShowEndPicker(true);
      }

    const handleStartDateChange = (event, selectedDate) => { // 캘린더 handler
        const currentDate = selectedDate || startDate;
        setShowStartPicker(false);
        setStartDate(currentDate);
    }

    const handleEndDateChange = (event, selectedDate) => { // 캘린더 handler
        const currentDate = selectedDate || endDate;
        setShowEndPicker(false);

        if (currentDate < startDate) {
            Alert.alert('종료일이 시작일 보다 과거입니다.', '기간을 다시 선택해주십시오.' )
        } else {
            setEndDate(currentDate);
        }
    }

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

    const formattedStartDate = startDate.toISOString().split('T')[0]; // startDate 포맷 YYYY-MM-DD
    const formattedEndDate = endDate.toISOString().split('T')[0]; // endDate 포맷 YYYY-MM-DD

    // 여기서부터 검색 결과
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const exhibitionsCtx = useContext(ExhibitionsContext);

    useEffect(() => {
        async function getExhibitions() {
            console.log('실행');
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

    if (!pressed) {
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

    return (
        <>
            <View style={styles.screen}> 
                <View style={styles.subTitle1}>
                    <TextInput 
                        style={styles.subTitleText} 
                        placeholder="전시회 이름을 검색해보세요. (선택)"
                        value={exhibitionName}
                        onChangeText={text => setExhibitionName(text)}    
                    />
                </View>
                <View style={styles.subTitle1}>
                    <TextInput 
                        style={styles.subTitleText} 
                        placeholder="전시회관을 검색해보세요. (선택)" 
                        value={exhibitionLocation}
                        onChangeText={text => setExhibitionLocation(text)}
                    />
                </View>
                <View style={styles.subTitle2}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        horizontal={true}
                    >
                        {district && district.map((item, index) => (<DistrictList key={index} districts={item} />))}
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
                    <Pressable onPress={showStartDateTimePicker}>
                        <Text style={styles.districtItems}>{formattedStartDate}</Text>
                        {showStartPicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                onChange={handleStartDateChange}
                            />
                        )}
                    </Pressable>
                    <Text style={styles.districtText}>~</Text>
                    <Pressable onPress={showEndDateTimePicker}>
                        <Text style={styles.districtItems}>{formattedEndDate}</Text>
                        {showEndPicker && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                onChange={handleEndDateChange}
                            />
                        )}
                    </Pressable>
                    <MaterialCommunityIcons name="calendar-multiple" size={24} color="#A3A098" />
                </View>
                <View style={styles.search}>
                    <Pressable style={styles.searchUi}>
                        <Text style={styles.searchFont}>검색하기</Text>
                    </Pressable>
                    <Pressable>
                        <MaterialIcons name="search" size={48} color="#A3A098" />
                    </Pressable>
                </View>
            </View>
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
        </>
    ); 
}

export default SearchOptions;

const styles = StyleSheet.create({
    screen: {
        marginBottom: "5%",
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
    testStyle1: {
        backgroundColor: 'black'
    },
    textStyle2: {
        backgroundColor: 'red'
    },
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