// 전시 ~ find, 돋보기 이미지까지
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Platform, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // expo icons 이미지
import { Entypo } from '@expo/vector-icons'; // expo icons 이미지
import { MaterialIcons } from '@expo/vector-icons'; // expo icons 이미지

function SearchOptionList() {
    const [district, setDistrict] = useState(['AB구', 'CD구', 'EF구']); // **구 list
    const [numColumns, setNumColumns] = useState(5); // 최대 5개로 함

    function DistrictList({districts}) {
        return <Text style={styles.districtItems}>{districts}</Text>;
    }
    
    return (
        <View> 
            <View style={styles.subTitle1}>
                <TextInput style={styles.subTitleText} placeholder="전시"></TextInput>
            </View>
            <View style={styles.subTitle1}>
                <TextInput style={styles.subTitleText} placeholder="장소"></TextInput>
            </View>
            <View style={styles.subTitle2}>
                <FlatList data={district} renderItem={(itemData) => <DistrictList districts={itemData.item} />} keyExtractor={(item) => item} numColumns={numColumns} />
                <Pressable>
                    <Entypo name="triangle-right" size={24} color="#A3A098" />
                </Pressable>
            </View>
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
    subTitle1: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        backgroundColor: '#A3A098',
        opacity: 0.35,
        marginHorizontal: 30,
        marginBottom: 15
    },
    subTitle2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        marginHorizontal: 30,
        marginBottom: 15,
    },
    subTitleText: {
        color: 'black'
    },
    districtItems: {
        fontSize: 16,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 3,
        backgroundColor: '#A3A098',
        borderRadius: 16,
        opacity: 0.5
    },
    districtText: {
        fontSize: 16,
        paddingHorizontal: 6,
        marginHorizontal: 10,
        marginVertical: 3,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        opacity: 0.5
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchUi: {
        marginHorizontal: 20,
        borderRadius: 24,
        backgroundColor: '#A3A098'
    },
    searchFont: {
        fontSize: 24,
        paddingHorizontal: 24,
        paddingVertical: 8,
        color: 'white'
    },    
});