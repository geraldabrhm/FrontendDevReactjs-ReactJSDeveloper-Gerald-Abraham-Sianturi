// Foodsquare
// const baseUrl = 'https://api.foursquare.com/v3'
// const APIKey = 'fsq3+i57q8XNPSVf4D+wEVFZCaS5284wwbF78emCecdbxnE=';

// The Fork The Spoon
const baseUrl = 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/'
// const APIKey = 'ec4a4a38d3mshb957208b0462504p1b7af6jsnfcd592060f24';
// const APIKey = '951b525b8emsh4925097dbefef84p11e3b8jsn236ea14b37b6';
// const APIKey = '796766c2e6msh1abcec11dff9673p1f6a9djsnf4a7bb97ef4b';
const APIKey = 'bc0551a727msh937516c4ba03a5bp11a420jsn4459917f7fa6';
const APIHost = 'the-fork-the-spoon.p.rapidapi.com';

export const getAllRestaurants = async (pageNumber: string) => {
    const url = baseUrl + "list?queryPlaceValueCityId=348156&pageNumber="+  pageNumber;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': APIKey,
            'X-RapidAPI-Host': APIHost,
        }
    };
  
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

export const getDetailRestaurant = async (id: string) => {
    const url = baseUrl + "get-info?restaurantId=" + id;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': APIKey,
            'X-RapidAPI-Host': APIHost,
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}
