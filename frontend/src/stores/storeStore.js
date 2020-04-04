import produce from 'immer';

// Action types
const actionTypes = {
    SET_STORES: 'aslot/store/SET_STORES',
    DELETE_STORES: 'aslot/store/DELETE_STORES'
}

// Action creators
const setStores = (stores) => {
    return {
        type: actionTypes.SET_STORES,
        stores,
    };
};

const deleteStores = () => {
    return {
        type: actionTypes.DELETE_STORES,
    };
}

export const storeActions = {
    setStores,
    deleteStores,
}

// Reducer Initialization
const initialState = {
    stores: []
};

// Reducer    
const reducer = ( state = initialState, action ) => 
    produce(state, draft => {
        switch ( action.type ) {
            case actionTypes.SET_STORES: 
                draft.stores = action.stores;
                return;
            case actionTypes.DELETE_STORES: 
                draft.stores = [];
                return;
        }
    });

export default reducer;