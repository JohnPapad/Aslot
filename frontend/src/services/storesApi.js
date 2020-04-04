import Layout from "../hoc/Layout/Layout";

export const storesApi = {
    getPins,
    getStores
};


function getPins(axios)
{
    return axios.get('/stores/pins')
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

// JsonRequest:
// {
//     searchTerm: "   ",
//     lat,
//     lng
// }
function getStores(axios, jsonRequest)
{
    return axios.get('/stores', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}


// function getPins(axios, jsonRequest)
// {
//     return axios.get('/stores/pins', jsonRequest)
//         .then( response =>  response ? response.data : null)
//         .catch( err => err);
// }