import axios from 'axios';

const DATABASE_URL = 'https://art-calendar-7d7e6-default-rtdb.firebaseio.com';

export async function fetchExhibitions() {
    const response = await axios.get(DATABASE_URL + '/exhibitions.json');

    const exhibitions = [];
    
    for (const key in response.data) {
        const exhibitionsObject = {
            id: key,
            title: response.data[key].title,
            thumbnail: response.data[key].thumbnail,
            exhibition: response.data[key].exhibition,
            startDate: response.data[key].startDate,
            endDate: response.data[key].endDate,
            time: response.data[key].time,
            restDay: response.data[key].restDay,
            fee: response.data[key].fee,
            callNumber: response.data[key].callNumber,
            siteAddress: response.data[key].siteAddress,
            mainAuthor: response.data[key].mainAuthor,
            otherAuthors: response.data[key].otherAuthors,
            imageInformations: response.data[key].imageInformations,
            textInformation: response.data[key].textInformation
        };
        exhibitions.push(exhibitionsObject);
    }
    return exhibitions;
}