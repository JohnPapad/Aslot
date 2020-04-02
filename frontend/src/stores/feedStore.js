import produce from 'immer';

// Action types
const actionTypes = {
    SAVE_FEED: 'hackathon/user/SAVE_FEED',
    ADD_FEED: 'hackathon/user/ADD_FEED',
    EMPTY_FEED: 'hackathon/user/EMPTY_FEED',
}


// Action creators


const addFeed = (feed) => {
    return {
        type: actionTypes.ADD_FEED,
        feed,
    };
};


const saveFeed = (feed) => {
    return {
        type: actionTypes.SAVE_FEED,
        feed,
    };
};

const emptyFeed = () => {
    return {
        type: actionTypes.EMPTY_FEED
    };
};

export const feedActions = {
    saveFeed,
    emptyFeed,
    addFeed 
}

// Reducer Initialization
const initialState = {
    feed: []
};

// Reducer    
const reducer = ( state = initialState, action ) => 
    produce(state, draft => {
        switch ( action.type ) {
            case actionTypes.SAVE_FEED: 
                draft.feed = action.feed;
                return;
            case actionTypes.EMPTY_FEED: 
                draft.feed = [];
                return;
            case actionTypes.ADD_FEED: 
                draft.feed.push(action.feed);
                return;
        }
    });

export default reducer;