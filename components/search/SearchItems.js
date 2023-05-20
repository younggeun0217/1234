// 검색 결과 이미지, title, 장소, 날짜, 전시중
import { Text, View, StyleSheet, Image } from "react-native";

function SearchItems({result}) {
    const { title, imageUrl, location, startDate, endDate } = result;
    return (
        <View style={styles.screen}>
            <View style={styles.listItem}>
                <Image style={styles.logoImage} source={{uri: imageUrl}} />
                <View style={styles.lists}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.text}>{location}</Text>
                    <Text style={styles.text}>{startDate} ~ {endDate}</Text>
                    <Text style={styles.onGoing}>전시중</Text>
                </View>
            </View>
        </View>
    );
}

export default SearchItems;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    listItem: {
        width:  '90%',
        marginBottom: 12
    },
    logoImage: {
        height: 250
    },
    text: {
        fontSize: 12
    },
    onGoing: {
        color: 'red'
    }
});