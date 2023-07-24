import AsyncStorage from "@react-native-async-storage/async-storage";

// 로컬 스토리지에 좋아요 누른거 저장하는 함수
export const saveLikedExhibition = async (title, thumbnail, exhibition, startDate, endDate, isLike='true') => {
    try {
        const likedExhibitionData = {
            title,
            thumbnail,
            exhibition,
            startDate,
            endDate,
            isLike
        };

        const dataToSave = JSON.stringify(likedExhibitionData);

        await AsyncStorage.setItem('likedExhibition', dataToSave);
        console.log(`AsyncStorage에 ${title} 저장됨`);
    } catch(error) {
        console.log('AsyncStorage에 저장 실패:', error);
    }
};

// 로컬 스토리지에 저장했던 좋아요 전시회 삭제하는 함수
export const deleteLikedExhibition = async (title) => {
    try {
        const data = await AsyncStorage.getItem('likedExhibition');
        
        if(data) {
            const likedExhibitionData = JSON.parse(data);

            if(likedExhibitionData.title === title) {
                await AsyncStorage.removeItem('likedExhibition');
                console.log(`AsyncStorage의 ${title} 데이터 삭제 성공`);
            } else {
                console.log('입력받은 title로 데이터를 찾지 못함');
            }
        } else {
            console.log('AsyncStorage에 데이터가 없음');
        }
    } catch(error) {
        console.log('삭제 에러:', error);
    }
};

// 로컬 스토리지에서 좋아요를 누른 전시회를 찾는 함수
export const findLikedExhibition = async (title, callback) => {
    try{
        const data = await AsyncStorage.getItem('likedExhibition');

        if(data) {
            const likedExhibitionData = JSON.parse(data);

            if (likedExhibitionData.title === title) {
                callback(likedExhibitionData.isLike); 
            } else {
                console.log('입력받은 title로 데이터를 찾지 못함');
            }
        } else {
            console.log('AsyncStorage에 데이터가 없음');
        }
    } catch(error) {
        console.log('찾기 에러:', error);
    }
};