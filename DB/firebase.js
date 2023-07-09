import axios from 'axios';

const DATABASE_URL = 'https://art-calendar-7d7e6-default-rtdb.firebaseio.com';

export async function fetchExhibitions(name, location, seoulDistrict) {
    const response = await axios.get(DATABASE_URL + '/exhibitions.json');
    console.log(name);
    console.log(location);
    console.log(seoulDistrict);
    const exhibitions = [];
    
    for (const key in response.data) {
        const exhibition = response.data[key];

        if (
            (!name || exhibition.title.toLowerCase().includes(name.toLowerCase())) &&
            (!location || exhibition.exhibition.toLowerCase().includes(location.toLowerCase())) &&
            (!seoulDistrict || exhibition.location.toLowerCase().includes(seoulDistrict.toLowerCase()))
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