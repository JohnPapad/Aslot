
export const reportApi = {
    getPins
};


function getPins(axios, jsonRequest)
{
    return axios.get('/users/report/list', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}