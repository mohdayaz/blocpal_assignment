import { combineReducers } from 'redux';

// Import Reducers

import playlistReducer from "../store/reducer"

//Combine Reducers For Each Module Here...
let rootReducer = combineReducers({
    playlistReducer: playlistReducer
});

// Serve Root Reducer

export default rootReducer;
