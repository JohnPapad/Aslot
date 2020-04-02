import produce from 'immer';
import axiosInstance from '../services/axiosConfig';

// Action types
const actionTypes = {
    AUTH_SUCCESS: 'hackathon/user/AUTH_SUCCESS',
    AUTH_LOGOUT: 'hackathon/user/AUTH_LOGOUT',
}


// Action creators



const authSuccess = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // add JWT from axios instance header
    // axiosInstance.headers.token = token;
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        user
    };
};

const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // remove JWT from axios instance header
    // axiosInstance.headers.token = null;

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const userActions = {
    authSuccess,
    logOut
}

// Reducer Initialization
const initialState = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
};

// Reducer    
const reducer = ( state = initialState, action ) => 
    produce(state, draft => {
        switch ( action.type ) {
            case actionTypes.AUTH_SUCCESS: 
                draft.token = action.token;
                draft.user = action.user;
                return;
            case actionTypes.AUTH_LOGOUT: 
                draft.token = null;
                draft.user = null;
                return;
        }
    });

export default reducer;