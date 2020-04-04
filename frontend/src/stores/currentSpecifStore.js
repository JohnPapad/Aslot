import produce from 'immer';

// Action types
const actionTypes = {
    SET_CURR_ITEMS: 'aslot/store/SET_CURR_ITEMS',
    SET_CURR_TIMESLOTS: 'aslot/store/CURR_TIMESLOTS',

    DELETE_ALL: 'aslot/store/DELETE_ALL'
}

// Action creators
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

const deleteAll = () => {
    return {
        type: actionTypes.DELETE_STORES,
    };
}

export const storeActions = {
    setCurrItems,
    setCurrTimeslots,
    deleteAll
}

// Reducer Initialization
const initialState = {
    items: [],
    timeslots: []
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