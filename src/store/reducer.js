import {
    SET_SUGGESTED_PLAYLIST,
    SET_GENRE,
    SET_MY_PLAYLIST
} from "./actionTypes"

const initialState = {
    _genreData: [],
    _suggestedList: [],
    _myPlayList: []
  };
  const playlistReducer  = (state=initialState, action) => {
    switch(action.type) {
        case SET_GENRE:
            return {
                ...state,
                _genreData: action.payload
            };
        case SET_SUGGESTED_PLAYLIST:
            return {
                ...state,
                _suggestedList: action.payload
            };
        case SET_MY_PLAYLIST:
            return {
                ...state,
                _myPlayList: action.payload
            };
      default:
        return state;
    }
  };
export default playlistReducer;