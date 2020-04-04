import produce from 'immer';

// Action types
const actionTypes = {
    SET_QUERY: 'aslot/store/SET_QUERY',
    SET_ADDRESS_INFO: 'aslot/store/SET_ADDRESS_INFO',

    DELETE_ALL: 'aslot/store/DELETE_ALL'
}

// Action creators
const setQuery = (query) => {
    return {
        type: actionTypes.SET_QUERY,
        query,
    }
}

const setAddressInfo = (addressInfo) => {
    return {
        type: actionTypes.SET_ADDRESS_INFO,
        addressInfo,
    }
}

const deleteAll = () => {
    return {
        type: actionTypes.DELETE_ALL,
    };
}

export const searchActions = {
    setQuery,
    setAddressInfo,
    deleteAll
}

// Reducer Initialization
const initialState = {
    query: '',
    addressInfo: {}
};

// Reducer    
const reducer = ( state = initialState, action ) => 
    produce(state, draft => {
        switch ( action.type ) {
            case actionTypes.SET_QUERY: 
                draft.query = action.query;
                return;
            case actionTypes.SET_ADDRESS_INFO: 
                draft.addressInfo = action.addressInfo;
                return;
            case actionTypes.DELETE_ALL: 
                draft.query = [];
                draft.addressInfo = [];
                return;
        }
    });

export default reducer;