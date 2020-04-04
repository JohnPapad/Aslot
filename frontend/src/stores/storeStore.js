import produce from 'immer';

// Action types
const actionTypes = {
    SET_STORES: 'aslot/store/SET_STORES',
    DELETE_STORES: 'aslot/store/DELETE_STORES',

    SET_CURR_ITEMS: 'aslot/store/SET_CURR_ITEMS',
    SET_CURR_TIMESLOTS: 'aslot/store/CURR_TIMESLOTS',
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

const setCurrItems = (items) => {
    return {
        type: actionTypes.SET_CURR_ITEMS,
        items,
    }
}

const setCurrTimeslots = (timeslots) => {
    return {
        type: actionTypes.SET_CURR_TIMESLOTS,
        timeslots,
    }
}

export const storeActions = {
    setStores,
    deleteStores,
    setCurrItems,
    setCurrTimeslots
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
                draft.items = [];
                draft.timeslots = [];
                return;
            case actionTypes.DELETE_STORES: 
                draft.stores = [];
                draft.items = [];
                draft.timeslots = [];
                return;
        }
    });

export default reducer;