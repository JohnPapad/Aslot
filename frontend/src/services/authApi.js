
export const authAPI = {
    signIn,
    signUp,
    logOut,
    checkEmailValidity,
    checkUsernameValidity,
    test
};

function signIn(axios, jsonRequest) 
{
    return axios.post('/stores/users/signin', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function signUp(axios, jsonRequest) 
{
    return axios.post('/users/signup', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function logOut(axios, jsonRequest) 
{
    return axios.post('/log_out', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function checkEmailValidity(axios, email)
{
    return axios.get('/users/signup', 
            {
                params: {
                    email: email
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}

function checkUsernameValidity(axios, username)
{
    return axios.get('/users/signup', 
            {
                params: {
                    username: username
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}


function test(axios)
{
    return axios.get('/users/test',
            {
                params: {
                    username: "username"
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}
