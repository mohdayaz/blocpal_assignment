
import { useEffect, useState } from 'react';
import { _getGenres, _getPlaylistByGenre, _setMyPlayList } from '../Model';
import { _setGenre, _setMyList, _setSuggestedPlayList } from '../store/actions';
import MyPlaylist from './MyPlaylist';
import PlaylistCard from './PlaylistCard';
import SelectGenre from "./Selectgenre"
import { useDispatch, useSelector } from "react-redux"


const Content = () => {
    const dispatch = useDispatch();

    const _genreData = useSelector(state  => state.playlistReducer._genreData)
    const _suggestedList = useSelector(state  => state.playlistReducer._suggestedList)
    const _myPlayList = useSelector(state  => state.playlistReducer._myPlayList)

    const [genreName, setGenreName] = useState("")
    const [suggestedListState, setsuggestedListState] = useState([])
    const [selectedIndex, setSelectedIndex] = useState("")
    const [refreshList, setrefreshList] = useState("")
    
    useEffect(() => {
        getGenreData()
    }, [])

    useEffect(() => {
        if(refreshList){
            let previousList = [..._myPlayList]
            const data = _suggestedList[selectedIndex]
            console.log("data.name", selectedIndex, _suggestedList, suggestedListState);
            const isIdAlreadyExist = previousList.some(e => e.id === data.id);
            if(isIdAlreadyExist){
            alert("its already added");
            }else{
            previousList.push(data)
            dispatch(_setMyList(previousList));
            }
            setrefreshList(false)
        }
    }, [refreshList])

    useEffect(() => {
        setsuggestedListState(_suggestedList)
    }, [_suggestedList])

    const getGenreData = async () => {
        //setgere
        const data = await _getGenres();
        dispatch(_setGenre(data))
        //set suggested playlist
        getPlaylist(data[0].id, data[0].name)
        //set data from locastorage
        const previousList = JSON.parse(localStorage.getItem("my_playlist")) || []
        dispatch(_setMyList(previousList))
    }

    const getPlaylist = async (id, name) => {
        const data = await _getPlaylistByGenre(id);
        dispatch(_setSuggestedPlayList(data))
        setGenreName(name)
    }

    const handleMyList = (index) => {
        setSelectedIndex(index)
        setrefreshList(true)
    }

    const getAnother = () => {
        console.log("ddd",_suggestedList, suggestedListState)
    }

    const deletePlaylist = id => {
        let previousList = [..._myPlayList]
        const index = previousList.findIndex(e => e.id === id);
        previousList.splice(index, 1)
        dispatch(_setMyList(previousList));
    }

    return <div className="content">
        <SelectGenre data={_genreData} handlePlaylist={(id, name) => getPlaylist(id, name)}/>
        <div className='container playlist_container'>
            <p className="title">Top 5 {genreName} Playlist</p>
			{suggestedListState.map((e,i) => <PlaylistCard xyz={i} key_name={i+1} data={e} handleMyList={(index) => handleMyList(index)}/>)}
		</div>
		<MyPlaylist data={[..._myPlayList]} deletePlaylist={id => deletePlaylist(id)}/>
    </div>
}

export default Content