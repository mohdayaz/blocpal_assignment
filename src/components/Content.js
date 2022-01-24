
import { useEffect, useState } from 'react';
import { _getGenres, _getPlaylistByGenre, _setMyPlayList } from '../Model';
import { _setGenre, _setMyList, _setSuggestedPlayList } from '../store/actions';
import MyPlaylist from './MyPlaylist';
import PlaylistCard from './PlaylistCard';
import SelectGenre from "./Selectgenre"
import { useDispatch, useSelector } from "react-redux"


const Content = () => {
    const dispatch = useDispatch();

    const { _genreData, _suggestedList, _myPlayList } = useSelector(state => ({
        _genreData: state.playlistReducer._genreData,
        _suggestedList: state.playlistReducer._suggestedList,
        _myPlayList: state.playlistReducer._myPlayList
    }))

    const [genreName, setGenreName] = useState("")
    
    useEffect(() => {
        getGenreData()
    }, [])

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

    const handleMyList = (data) => {
        let previousList = [..._myPlayList]
        debugger
        const isIdAlreadyExist = previousList.some(e => e.id === data.id);
        if(isIdAlreadyExist){
            alert("its already added");
        }else{
            previousList.push(data)
            dispatch(_setMyList(previousList));
        }
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
			{_suggestedList.map((e,i) => <PlaylistCard key_name={i+1} data={e} handleMyList={(data) => handleMyList(data)}/>)}
		</div>
		<MyPlaylist data={[..._myPlayList]} deletePlaylist={id => deletePlaylist(id)}/>
    </div>
}

export default Content