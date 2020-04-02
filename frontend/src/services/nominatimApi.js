
export const nominatimApi = {
    getGeoLocation,
    getAddress
};

function getGeoLocation(axios, query) 
{
    return axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: query,
            format: 'geocodejson'
        }
    })
        .then(response => {
            return response.data;
        })
        // May need to remove handle error here (no need for logout) 
        .catch( err => err);
}

function getAddress(axios, { lat, lng }) 
{
    return axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
            format: 'geocodejson',
            lat,
            lon: lng,
        }
    })
        .then(response => {
            return response.data;
        })
        // May need to remove handle error here (no need for logout) 
        .catch( err => err);
}


