
export const storesApi = {
    getPins
};


function getPins(axios)
{
    return axios.get('/stores/pins')
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}


// function getPins(axios, jsonRequest)
// {
//     return axios.get('/stores/pins', jsonRequest)
//         .then( response =>  response ? response.data : null)
//         .catch( err => err);
// }