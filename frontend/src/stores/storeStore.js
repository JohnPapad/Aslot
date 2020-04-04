import produce from 'immer';

// Action types
const actionTypes = {
    REFRESH_STORES: 'aslot/store/REFRESH_STORES',
    DELETE_STORES: 'aslot/store/DELETE_STORES'
}

// Action creators
const refreshStores = (stores) => {
    return {
        type: actionTypes.REFRESH_STORES,
        stores,
    };
};

const deleteStores = () => {
    return {
        type: actionTypes.DELETE_STORES,
    };
}

export const feedActions = {
    refreshStores,
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
            case actionTypes.REFRESH_STORES: 
                draft.stores = action.stores;
                return;
            case actionTypes.DELETE_STORES: 
                draft.stores = [];
                return;
        }
    });

export default reducer;