import produce from 'immer';
import { storesApi } from '../services/storesApi';
import { convertListToObjectById } from '../utilities/utilities';

// Action types
const actionTypes = {
    SET_CURR_STORE: 'aslot/specif/SET_CURR_STORE',
    SET_CURR_ITEMS: 'aslot/specif/SET_CURR_ITEMS',
    SET_CURR_TIMESLOTS: 'aslot/specif/CURR_TIMESLOTS',
    SET_SELECTED_ITEM: 'aslot/specif/SET_SELECTED_ITEM',

    DELETE_ALL: 'aslot/specif/DELETE_ALL',

    SET_FETCHING: 'aslot/specif/SET_FETCHING'
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
        items: convertListToObjectById(items, "id")
    }
}

const setCurrTimeslots = (timeslots) => {
    return {
        type: actionTypes.SET_CURR_TIMESLOTS,
        timeslots,
    }
}

const setSelectedItem = (selectedItem) => {
    return {
        type: actionTypes.SET_SELECTED_ITEM,
        selectedItem,
    }
}

const deleteAll = () => {
    return {
        type: actionTypes.DELETE_ALL,
    };
}

const setFetching = (fetching) => {
    return {
        type: actionTypes.SET_FETCHING,
        fetching
    };
}

const redirectToStore = (axios, id, history, selectedItem) => {
    return function(dispatch) {
        dispatch(deleteAll());
        dispatch(setFetching(true));

        const storePromise = storesApi.getStore(axios, id)
            .then(res =>{
                    if (res) {
                    dispatch(setFetching(false));

                    dispatch(setCurrStore(res.store_info));
                    dispatch(setCurrItems(res.inventory));                
                    dispatch(setCurrTimeslots(res.timeslots));

                    // set selected item if defined
                    if (selectedItem) {
                        dispatch(setSelectedItem(selectedItem));
                    }

                    // only push if history is defined
                    if (history) {
                        history.push('./store/' + id);
                    }
                }
            })

        // const invPromise = storesApi.getStoreInventory(axios, {storeID: id});
        // const timeslotPromise = storesApi.getTimeslots(axios, {storeID: id});

        // Promise.all([storePromise, invPromise, timeslotPromise])
        //     .then(values => {
                
        //     });
    }
}

export const specifActions = {
    setCurrStore,
    setCurrItems,
    setCurrTimeslots,
    setSelectedItem,
    deleteAll,
    setFetching,

    // thunks
    redirectToStore
}

// Reducer Initialization
const initialState = {
    store: null,
    items: {},
    timeslots: [],
    fetching: false,
    noData: true,
    selectedItem: null
};

// Reducer    
const reducer = ( state = initialState, action ) => 
    produce(state, draft => {
        switch ( action.type ) {
            case actionTypes.SET_CURR_STORE: 
                draft.store = action.store;
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
            case actionTypes.SET_SELECTED_ITEM: 
                draft.selectedItem = action.selectedItem;
                return;
            case actionTypes.DELETE_ALL: 
                draft.store = null;
                draft.items = {};
                draft.timeslots = [];
                draft.selectedItem = null;
                draft.noData  = true;
                draft.fetching = false;
                return;
            case actionTypes.SET_FETCHING: 
                draft.fetching = action.fetching;
                return;
        }
    });

export default reducer;