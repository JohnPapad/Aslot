import produce from 'immer';
import { storesApi } from '../services/storesApi';

// Action types
const actionTypes = {
    SET_CURR_STORE: 'aslot/store/SET_CURR_STORE',
    SET_CURR_ITEMS: 'aslot/store/SET_CURR_ITEMS',
    SET_CURR_TIMESLOTS: 'aslot/store/CURR_TIMESLOTS',

    DELETE_ALL: 'aslot/store/DELETE_ALL',

    SET_FETCHING: 'aslot/store/SET_FETCHING'
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

const setFetching = (fetching) => {
    return {
        type: actionTypes.SET_FETCHING,
        fetching
    };
}

const redirectToStore = (axios, id, history) => {
    return function(dispatch) {
        dispatch({type: actionTypes.DELETE_ALL});
        dispatch({type: actionTypes.SET_FETCHING, fetching: true});

        const storePromise = storesApi.getStore(axios, id);
        const invPromise = storesApi.getStoreInventory(axios, {storeID: id});
        const timeslotPromise = storesApi.getTimeslots(axios, {storeID: id});

        Promise.all([storePromise, invPromise, timeslotPromise])
            .then(values => {
                dispatch({type: actionTypes.SET_FETCHING, fetching: false});

                console.log('PROMISE VALUES');
                console.log(values);
                history.push('./store/' + id);
            });
    }
}

export const specifActions = {
    setCurrStore,
    setCurrItems,
    setCurrTimeslots,
    deleteAll,
    setFetching,

    // thunks
    redirectToStore
}

// Reducer Initialization
const initialState = {
    store: null,
    items: [],
    timeslots: [],
    fetching: false,
    noData: true
};

// Reducer    
const reducer = ( state = initialState, action ) => 
    produce(state, draft => {
        switch ( action.type ) {
            case actionTypes.SET_CURR_STORE: 
                draft.store = action.stores;
                draft.noData  = false;
                return;
            case actionTypes.SET_CURR_ITEMS: 
                draft.items = action.items;
                draft.noData  = false;
                return;
            case actionTypes.SET_CURR_ITEMS: 
                draft.timeslots = action.timeslots;
                draft.noData  = false;
                return;
            case actionTypes.DELETE_ALL: 
                draft.stores = [];
                draft.items = [];
                draft.timeslots = [];
                draft.noData  = true;
                return;
            case actionTypes.SET_FETCHING: 
                draft.fetching = action.fetching;
                return;
        }
    });

export default reducer;