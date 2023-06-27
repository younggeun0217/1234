import axios from 'axios';

const DATABASE_URL = 'https://art-calendar-7d7e6-default-rtdb.firebaseio.com';

export async function fetchExhibitions() {
    const response = await axios.get(DATABASE_URL + '/exhibitions.json');

    const exhibitions = [];
    
    for (const key in response.data) {
        const exhibitionsObject = {
            id: key,
            thumbnail: response.data[key].thumbnail,
            title: response.data[key].title,
            exhibition: response.data[key].exhibition,
            startDate: response.data[key].startDate,
            endDate: response.data[key].endDate
        };
        exhibitions.push(exhibitionsObject);
    }
    return exhibitions;
}