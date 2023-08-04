import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getAllLikedExhibitions } from './path/to/localStorage.js';

const LikedExhibitionsScreen = () => {
    const [likedExhibitions, setLikedExhibitions] = useState([]); // 전시회 데이터들

    useEffect(() => { // 렌더링 될 때 마다 fetching
        fetchLikedExhibitions();
    }, []);

    const fetchLikedExhibitions = async () => {
        try {
            const likedExhibitionDataArray = await getAllLikedExhibitions(); // 모두 가져오는 함수 실행
            setLikedExhibitions(likedExhibitionDataArray); // 데이터 likedExhibitions에 저장
        } catch (error) {
            console.log('fetching 에러:', error); // fetching 에러
        }
    };

    const renderItem = ({ item }) => (
        <View>
        <Text>Title: {item.title}</Text>
        <Text>Thumbnail: {item.thumbnail}</Text>
        <Text>Exhibition: {item.exhibition}</Text>
        <Text>Start Date: {item.startDate}</Text>
        <Text>End Date: {item.endDate}</Text>
        <Text>Is Like: {item.isLike}</Text>
        </View>
    );

    return (
        <View>
        <FlatList
            data={likedExhibitions}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
        />
        </View>
    );
};

export default LikedExhibitionsScreen;
