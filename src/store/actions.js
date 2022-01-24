import { _setMyPlayList } from "../Model"
import {
    SET_SUGGESTED_PLAYLIST,
    SET_GENRE,
    SET_MY_PLAYLIST
} from "./actionTypes"

export const _setGenre = (data) => {
    return dispatch => {
        dispatch({
            type: SET_GENRE,
            payload: data
        })
    }
}

export const _setSuggestedPlayList = (data) => {
    return dispatch => {
        dispatch({
            type: SET_SUGGESTED_PLAYLIST,
            payload: data
        })
    }
}

export const _setMyList = (data) => {
    return dispatch => {
        dispatch({
            type: SET_MY_PLAYLIST,
            payload: data
        });
        _setMyPlayList(data);
    }
}