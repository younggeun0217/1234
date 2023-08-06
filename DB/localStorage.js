import AsyncStorage from "@react-native-async-storage/async-storage";

// 로컬 스토리지에 좋아요 누른거 저장하는 함수
export const saveLikedExhibition = async (title, thumbnail, exhibition, startDate, endDate, isLike='true') => {
    try {
        const key = title;
        const likedExhibitionData = {
            key,
            title,
            thumbnail,
            exhibition,
            startDate,
            endDate,
            isLike
        };
        const dataToSave = JSON.stringify(likedExhibitionData);

        await AsyncStorage.setItem(key, dataToSave);
        console.log(`AsyncStorage에 ${title} 저장됨`);
    } catch(error) {
        console.log('AsyncStorage에 저장 실패:', error);
    }
};

// 로컬 스토리지에 저장했던 좋아요 전시회 삭제하는 함수
export const deleteLikedExhibition = async (title) => {
    try {
        const data = await AsyncStorage.getItem(title);
        
        if(data) {
            await AsyncStorage.removeItem(title);
            console.log(`AsyncStorage의 ${title} 데이터 삭제 성공`);
        } else {
            console.log('AsyncStorage에 데이터가 없음');
        }
    } catch(error) {
        console.log('삭제 에러:', error);
    }
};

// 로컬 스토리지에서 좋아요를 누른 전시회를 찾는 함수
export const getAllLikedExhibitions = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const likedExhibitionDataArray = [];

      for (const key of keys) {
        try {
          const data = await AsyncStorage.getItem(key);
          if (data) {
            const likedExhibitionData = JSON.parse(data);
            likedExhibitionDataArray.push(likedExhibitionData);
          }
        } catch (error) {
          console.log(`key를 이용하여 찾지 못하였습니다. ${key}:`, error);
        }
      }
  
      return likedExhibitionDataArray;
    } catch (error) {
      console.log('fetching 에러가 발생하였습니다. :', error);
      return [];
    }
  };

