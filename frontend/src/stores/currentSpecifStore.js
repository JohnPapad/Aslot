import produce from 'immer';

// Action types
const actionTypes = {
    SET_CURR_STORE: 'aslot/store/SET_CURR_STORE',
    SET_CURR_ITEMS: 'aslot/store/SET_CURR_ITEMS',
    SET_CURR_TIMESLOTS: 'aslot/store/CURR_TIMESLOTS',

    DELETE_ALL: 'aslot/store/DELETE_ALL'
}

// Action creators
const setCurrStore = (store) => {
    return {
        type: actionTypes.SET_CURR_STORE,
        store,
    }
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

const deleteAll = () => {
    return {
        type: actionTypes.DELETE_STORES,
    };
}

export const storeActions = {
    setCurrStore,
    setCurrItems,
    setCurrTimeslots,
    deleteAll
}

// Reducer Initialization
const initialState = {
    store: null,
    items: [],
    timeslots: []
};

// Reducer    
const reducer = ( state = initialState, action ) => 
    produce(state, draft => {
        switch ( action.type ) {
            case actionTypes.SET_CURR_STORE: 
                draft.store = action.stores;
                return;
            case actionTypes.SET_CURR_ITEMS: 
                draft.items = action.items;
                return;
            case actionTypes.SET_CURR_ITEMS: 
                draft.timeslots = action.timeslots;
                return;
            case actionTypes.DELETE_ALL: 
                draft.stores = [];
                draft.items = [];
                draft.timeslots = [];
                return;
        }
    });

export default reducer;