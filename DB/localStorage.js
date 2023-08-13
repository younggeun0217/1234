import AsyncStorage from "@react-native-async-storage/async-storage";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const calculateDurationInDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // 'Day' 로 변경
  return daysDifference;
};

const formatDate = (date) => {
  const parts = date.split(".");
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
};

// 로컬 스토리지에 좋아요 누른거 저장하는 함수
export const saveLikedExhibition = async ( title, thumbnail, exhibition, startDate, endDate, isLike = "true", memos = {}) => {
  try {
    const key = title;
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const duration = calculateDurationInDays(
      formattedStartDate,
      formattedEndDate
    );
    const likedExhibitionData = {
      key,
      title,
      thumbnail,
      exhibition,
      startDate,
      endDate,
      isLike,
      color: generateRandomColor(),
      duration: duration,
      ...memos,
    };
    const dataToSave = JSON.stringify(likedExhibitionData);

    await AsyncStorage.setItem(key, dataToSave);
    console.log(`AsyncStorage에 ${title} 저장됨`);
  } catch (error) {
    console.log("AsyncStorage에 저장 실패:", error);
  }
};

// 로컬 스토리지에 저장했던 좋아요 전시회 삭제하는 함수
export const deleteLikedExhibition = async (title) => {
  try {
    const data = await AsyncStorage.getItem(title);

    if (data) {
      await AsyncStorage.removeItem(title);
      console.log(`AsyncStorage의 ${title} 데이터 삭제 성공`);
    } else {
      console.log("AsyncStorage에 데이터가 없음");
    }
  } catch (error) {
    console.log("삭제 에러:", error);
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
    console.log("fetching 에러가 발생하였습니다. :", error);
    return [];
  }
};

// 메모 저장하는 함수
// date : 2023.08.05
// memoText : '7시에 관람하기'
export const addMemoToExhibition = async (title, date, memoText) => {
  try {
    const data = await AsyncStorage.getItem(title);

    if (data) {
      const likedExhibitionData = JSON.parse(data);
      
      if (!likedExhibitionData[date]) {
        likedExhibitionData[date] = { memoText };
      } else {
        likedExhibitionData[date].memoText = memoText; // 이미 메모 있으면 메모 업데이트
      }

      const updatedData = JSON.stringify(likedExhibitionData);
      await AsyncStorage.setItem(title, updatedData);
      console.log(`${memoText} 가 ${title}의 ${date} 에 추가되었습니다. `);
    }
  } catch (error) {
    console.log(`메모를 추가하는 도중 에러가 발생하였습니다.:`, error);
  }
};

// 메모 가져오는 함수
// date : 2023.08.05
export const getMemoData = async (title, date) => {
  try {
      const data = await AsyncStorage.getItem(title);
      if (data) {
          const likedExhibitionData = JSON.parse(data);
          const memoData = likedExhibitionData[date];
          if (memoData) {
              console.log(memoData.memoText);
              return memoData.memoText;
          } else {
              console.log(`${title}에 있는 ${date} 메모를 찾지 못하였습니다.`);
              return null;
          }
      } else {
          console.log(`${title} 데이터를 찾지 못하였습니다.`);
          return null;
      }
  } catch (error) {
      console.log(`${title}의 ${date}를 찾지 못하였습니다.:`, error);
      return null;
  }
};

// 메모 삭제하는 함수
// date : 2023.08.05
export const deleteMemoFromExhibition = async (title, date) => {
  try {
    const data = await AsyncStorage.getItem(title);

    if (data) {
      const likedExhibitionData = JSON.parse(data);

      if (likedExhibitionData[date]) {
        delete likedExhibitionData[date].memoText; // 메모가 있으면 삭제하기
        const updatedData = JSON.stringify(likedExhibitionData);
        await AsyncStorage.setItem(title, updatedData);
        console.log(`${title}의 ${date} 메모가 삭제되었습니다.`);
      } else {
        console.log(`${title}의 ${date} 메모를 찾지 못하였습니다.`);
      }
    }
  } catch (error) {
    console.log(`${title}의 ${date} 메모를 삭제하는 도중 오류가 발생하였습니다.:`, error);
  }
};

// 컬러 변경하는 함수
export const changeLikedColor = async (title, color) => {
  try {
    const data = await AsyncStorage.getItem(title);

    if (data) {
      const likedExhibitionData = JSON.parse(data);
      likedExhibitionData.color = color;

      const updatedData = JSON.stringify(likedExhibitionData);
      await AsyncStorage.setItem(title, updatedData);
      console.log(`${title}의 색상이 변경되었습니다.`);
    } else {
      console.log(`해당 ${title}의 데이터가 존재하지 않습니다.`);
    }
  } catch (error) {
    console.log(`색상 변경 중 에러가 발생하였습니다. ${title}:`, error);
  }
};

// 모든 데이터 삭제용 함수 (전부 삭제하는게 필요할 때 사용)
export const deleteAllLocalStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await Promise.all(
      keys.map(async (key) => {
        try {
          await AsyncStorage.removeItem(key);
          console.log(`AsyncStorage의 ${key} 데이터 삭제 성공`);
        } catch (error) {
          console.log(`AsyncStorage 데이터 삭제 에러 (${key}):`, error);
        }
      })
    );

    console.log("모든 로컬 스토리지 데이터 삭제 완료");
  } catch (error) {
    console.log("로컬 스토리지 데이터 삭제 에러:", error);
  }
};
