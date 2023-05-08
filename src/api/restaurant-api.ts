// The Fork The Spoon
const baseUrl = 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/'
const APIHost = 'the-fork-the-spoon.p.rapidapi.com';

const APIKey = 'd861329b59mshf6f61368b2f9646p1380b2jsn29ad826d68fb';

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

export const getReviewList = async (id: string) => {
    const url = 'https://the-fork-the-spoon.p.rapidapi.com/reviews/v2/list?restaurantId=' + id + '&limit=10&offset=0&withReview=WITH_REVIEW'
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