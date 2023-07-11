import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATABASE_URL = 'https://art-calendar-7d7e6-default-rtdb.firebaseio.com';

async function getUserId() { // userId 생성 및 get
    let userId = await AsyncStorage.getItem('userId');
  
    if (!userId) {
      userId = uuidv4();
      await AsyncStorage.setItem('userId', userId);
    }
  
    return userId;
}

export async function fetchExhibitions(exhibitionTitle, exhibitionLocation, district, startDate, endDate) { // 데이터 출력하는 함수
    const response = await axios.get(DATABASE_URL + '/exhibitions.json');
    const exhibitions = [];
    // const startDate1 = startDate;
    // const endDate1 = endDate;

    for (const key in response.data) {
        const exhibition = response.data[key];
        const exhibitionDistrict = extractDistrictFromLocation(exhibition.location);
        // const startDate2 = exhibition.startDate;
        // const endDate2 = exhibition.endDate;
        
        // 날짜 비교 코드 작성중
        // const exhibitionStartDate = new Date(startDate2.replace(/\./g, '-'));
        // const exhibitionEndDate = new Date(endDate2.replace(/\./g, '-'));

        if ( // 검색 코드
            (!district || district.some(d => exhibitionDistrict.toLowerCase().includes(d.toLowerCase())))
            && (!exhibitionTitle || exhibition.title.toLowerCase().includes(exhibitionTitle.toLowerCase()))
            && (!exhibitionLocation || exhibition.exhibition.toLowerCase().includes(exhibitionLocation.toLowerCase()))
        ) {
            const exhibitionObject = {
                id: key,
                title: exhibition.title,
                thumbnail: exhibition.thumbnail,
                exhibition: exhibition.exhibition,
                startDate: exhibition.startDate,
                endDate: exhibition.endDate,
                time: exhibition.time,
                restDay: exhibition.restDay,
                fee: exhibition.fee,
                location: exhibition.location,
                callNumber: exhibition.callNumber,
                siteAddress: exhibition.siteAddress,
                mainAuthor: exhibition.mainAuthor,
                otherAuthors: exhibition.otherAuthors,
                imageInformations: exhibition.imageInformations,
                textInformation: exhibition.textInformation,
            };
            exhibitions.push(exhibitionObject);
        }
    }
    return exhibitions;
}

export async function postDataInUserDB(title, thumbnail, exhibition, startDate, endDate, isLike='true') { // 유저DB에 저장하는 함수
    const userId = await getUserId();
    const newData = {
        title,
        thumbnail,
        exhibition,
        startDate,
        endDate,
        isLike
    };

    try {
        const response = await axios.post(DATABASE_URL+ `/users/${userId}.json`, newData);
        console.log('데이터 저장 완료');
    } catch(error) {
        console.error('데이터 저장 실패 :', error);
    }
}

export async function findAndDeleteInUserDB(title) { // 좋아요 삭제 코드
    const userId = await getUserId();
    try {
        const response = await axios.get(DATABASE_URL+ `/users/${userId}.json`);
        const data = response.data;

        for (const key in data) {
            const exhibit = data[key];

            if (exhibit.title === title) {
                await axios.delete(DATABASE_URL+ `/users/${userId}/${key}.json`);
                console.log(`데이터 삭제 : ${title}`);
            }
        }
    } catch(error) {
        console.error('삭제하려는 데이터를 찾지 못함 :', error);
    }
}

export async function findIsLike(title, callback) { // 좋아요 인지 확인하는 함수
    const userId = await getUserId();
    try {
        const response = await axios.get(DATABASE_URL+ `/users/${userId}.json`);
        const data = response.data;

        for (const key in data) {
            const exhibit = data[key];
            if (exhibit.title === title) {
                callback(exhibit.isLike); 
                break; 
            }
        }
    } catch(error) {
        console.error('유저 DB 조회 후 좋아요 리스트 찾는 도중 에러가 발생하였습니다. :', error);
    }
}

function extractDistrictFromLocation(location) { // 지역구 DB에서 위치 찾기위한 함수
    const parts = location.split(' ');
    if (parts.length > 1) {
        return parts[1]; 
    }
    return '';
}