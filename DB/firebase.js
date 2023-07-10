import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const DATABASE_URL = 'https://art-calendar-7d7e6-default-rtdb.firebaseio.com';

const userId = uuidv4();

export async function fetchExhibitions(exhibitionTitle, exhibitionLocation, district) { // 데이터 출력하는 함수
    const response = await axios.get(DATABASE_URL + '/exhibitions.json');
    console.log(exhibitionTitle);
    console.log(exhibitionLocation);
    console.log(district);
    const exhibitions = [];
    
    for (const key in response.data) {
        const exhibition = response.data[key];
        const exhibitionDistrict = extractDistrictFromLocation(exhibition.location);

        if (
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
                textInformation: exhibition.textInformation
            };
            exhibitions.push(exhibitionObject);
        }
    }
    return exhibitions;
}

export async function postDataInUserDB(title, thumbnail, exhibition, startDate, endDate) { // 유저DB에 저장하는 함수
    const newData = {
        title,
        thumbnail,
        exhibition,
        startDate,
        endDate,
    };

    try {
        const response = await axios.post(DATABASE_URL+ `/users/${userId}.json`, newData);
        console.log('데이터 저장 완료');
    } catch(error) {
        console.error('데이터 저장 실패 :', error);
    }
}

export async function findAndDeleteInUserDB(title) {
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

function extractDistrictFromLocation(location) { // 지역구 위치 찾기위한 함수
    const parts = location.split(' ');
    if (parts.length > 1) {
        return parts[1]; 
    }
    return '';
}